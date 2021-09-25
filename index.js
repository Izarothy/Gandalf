/* eslint-disable no-unused-vars */
require("dotenv").config();
const {Discord, Client, Intents} = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES ]})
const config = require("./config.json");
const { prefix } = require("./config.json");
const channels = require("./json/channels.json");

client.once("ready", () => {
  console.log("The bot is working.");
})

// Assign a text channel to a voice channel
client.on("voiceStateUpdate", (previousVoiceState, currentVoiceState) => {
  let currentVoiceChannel = currentVoiceState.channel;
  let previousVoiceChannel = previousVoiceState.channel;
  let voiceChannelUser = currentVoiceState.member;

  if (currentVoiceChannel === null || currentVoiceChannel === undefined) {
    let previousChannelIndex = channels.voice.indexOf(previousVoiceChannel.id)
    let previousTextChannel = client.channels.cache.get(channels.text[previousChannelIndex])
    previousTextChannel.permissionOverwrites.delete(voiceChannelUser)
    return;
  }
  if (currentVoiceChannel !== previousVoiceChannel) {
    let voiceChannelIndex = channels.voice.indexOf(currentVoiceChannel.id)
        let currentTextChannel = client.channels.cache.get(channels.text[voiceChannelIndex])
        currentTextChannel.permissionOverwrites.create(voiceChannelUser, {VIEW_CHANNEL: true});
        if (previousVoiceChannel) {
          let previousChannelIndex = channels.voice.indexOf(previousVoiceChannel.id);
          let previousTextChannel = client.channels.cache.get(channels.text[previousChannelIndex]);
          previousTextChannel.permissionOverwrites.delete(voiceChannelUser);
        }
  }

});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const reactToAMeme = () => {
    message.react("👍");
    message.react("👎");
  }

  if (message.channel.id === config.meme_id) {
    if (message.content.includes('http')) {
      reactToAMeme();
    }
      else {
      message.delete(); }}

});

client.login(process.env.CLIENT_TOKEN);
