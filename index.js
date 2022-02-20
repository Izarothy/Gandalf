require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
const config = require('./config.json');
const channels = require('./json/channels.json');
const fs = require('fs');

// Read command files
client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('The bot is working.');
});

process.on('uncaughtException', (err) => {
  console.log('Caught exception: ', err);
});

// Assign a text channel to a voice channel
client.on('voiceStateUpdate', (previousVoiceState, currentVoiceState) => {
  const currentVC = currentVoiceState.channel;
  const previousVC = previousVoiceState.channel;
  const voiceUser = currentVoiceState.member;

  // Leaves voice chat
  if (!currentVC) {
    const previousText = client.channels.cache.get(
      channels.voicePairs.find((chan) => chan.voice === previousVC.id).text
    );
    return previousText.permissionOverwrites.delete(voiceUser);
  }

  // Joins voice chat
  if (currentVC !== previousVC) {
    const currentText = client.channels.cache.get(
      channels.voicePairs.find((chan) => chan.voice == currentVC.id).text
    );
    currentText.permissionOverwrites.create(voiceUser, {
      VIEW_CHANNEL: true,
    });

    // Changes voice channels - remove view for previous channel
    if (previousVC) {
      const previousText = client.channels.cache.get(
        channels.voicePairs.find((chan) => chan.voice === previousVC.id).text
      );
      previousText.permissionOverwrites.delete(voiceUser);
    }
  }
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.channel.id === config.meme_id) {
    if (message.content.includes('http') || message.attachments.size > 0) {
      message.react('👍');
      message.react('👎');
    } else {
      message.delete();
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'Wystąpił błąd',
      ephemeral: true,
    });
  }
});

client.login(process.env.CLIENT_TOKEN);
