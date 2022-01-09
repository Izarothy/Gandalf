require('dotenv').config();
const { MessageEmbed, Client, Intents } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
const config = require('./config.json');
const channels = require('./json/channels.json');
const minecraftMessage = require('./json/messages.json').minecraft;
const schedule = require('node-schedule');
const mongoose = require('mongoose');
const Database = require('./Mongo/Mongoose.js');
const addQuoteCommand = config.addQuoteCommand;

client.once('ready', () => {
  console.log('The bot is working.');
});

let quote = {};
let quoteInProgress = false;
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

const messageTimeBefore = '0 0 14 * * *';
const messageTimeAfter = '0 0 15 * * *';

const jobBefore = schedule.scheduleJob(messageTimeBefore, async () => {
  if (quoteInProgress) {
    client.channels.fetch(channels.dyskusjaTolkien).then((channel) => {
      channel.send('Nikt nie podał poprawnej odpowiedzi.');
    });
    quoteInProgress = false;
    await Database.deleteQuote(quote.question);
  }
});

const jobAfter = schedule.scheduleJob(messageTimeAfter, async () => {
  quote = await Database.fetchQuote();
  if (quote) {
    const quoteEmbed = new MessageEmbed()
      .setTitle('Kto wypowiedział te słowa?')
      .setColor('#0099ff')
      .setDescription(quote.question)
      .setFooter('Kto pierwszy napisze poprawne imię, wygrywa.');
    client.channels
      .fetch(channels.dyskusjaTolkien)
      .then((channel) => channel.send({ embeds: [quoteEmbed] }));
    quoteInProgress = true;
  }
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

  if (message.content.startsWith(addQuoteCommand)) {
    const args = message.content
      .slice(addQuoteCommand.length)
      .trim()
      .split('-o');
    const question = args[0].trim();
    const answer = args[1].trim();

    Database.addQuote(question, answer);
    message.delete();
  }
  if (message.channel.id === channels.dyskusjaTolkien && quoteInProgress) {
    (async () => {
      if (message.content === quote.answer) {
        message.react('🎉');
        message.reply('Wygrałeś!');
        quoteInProgress = false;
        await Database.deleteQuote(quote.question);
      }
    })();
  }
  if (
    message.content === '!minecraft' &&
    message.channel.id === config.minecraft_id
  ) {
    const minecraftEmbed = new MessageEmbed()
      .setTitle(minecraftMessage.title)
      .setDescription(minecraftMessage.description)
      .setColor(minecraftMessage.color)
      .setThumbnail(minecraftMessage.thumbnail);

    message.channel.send({ embeds: [minecraftEmbed] });
    message.delete();
  }

  if (message.channel.id === config.meme_id) {
    if (message.content.includes('http') || message.attachments.size > 0) {
      message.react('👍');
      message.react('👎');
    } else {
      message.delete();
    }
  }
});

client.login(process.env.CLIENT_TOKEN);
