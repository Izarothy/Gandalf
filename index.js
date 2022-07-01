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

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.channel.id === config.meme_id) {
    if (message.content.includes('http') || message.attachments.size > 0) {
      message.react('👍');
      return message.react('👎')
    }
    message.channel.send(`<@${message.author.id}>, wiadomości na tym kanale mogą zawierać tylko link lub załącznik`)
    message.delete();
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
