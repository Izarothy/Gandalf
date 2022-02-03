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

mongoose
  .connect(process.env.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected.');
  })
  .catch((err) => {
    console.log(err);
  });

process.on('uncaughtException', (err) => {
  console.log('Caught exception: ', err);
});

// Assign a text channel to a voice channel
client.on('voiceStateUpdate', (previousVoiceState, currentVoiceState) => {
  let currentVoiceChannel = currentVoiceState.channel;
  let previousVoiceChannel = previousVoiceState.channel;
  let voiceChannelUser = currentVoiceState.member;

  if (currentVoiceChannel === null || currentVoiceChannel === undefined) {
    let previousChannelIndex = channels.voice.indexOf(previousVoiceChannel.id);
    let previousTextChannel = client.channels.cache.get(
      channels.text[previousChannelIndex]
    );
    previousTextChannel.permissionOverwrites.delete(voiceChannelUser);
    return;
  }

  if (currentVoiceChannel !== previousVoiceChannel) {
    let voiceChannelIndex = channels.voice.indexOf(currentVoiceChannel.id);
    let currentTextChannel = client.channels.cache.get(
      channels.text[voiceChannelIndex]
    );
    currentTextChannel.permissionOverwrites.create(voiceChannelUser, {
      VIEW_CHANNEL: true,
    });

    if (previousVoiceChannel) {
      let previousChannelIndex = channels.voice.indexOf(
        previousVoiceChannel.id
      );
      let previousTextChannel = client.channels.cache.get(
        channels.text[previousChannelIndex]
      );
      previousTextChannel.permissionOverwrites.delete(voiceChannelUser);
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
