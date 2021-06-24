/* eslint-disable no-unused-vars */
const fs = require("fs");
require("dotenv").config();
const Discord = require("discord.js");
const config = require("./config.json");
const { prefix } = require("./config.json");
const channels = require("./json/channels.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Mongo
const { MongoClient } = require('mongodb');
const { cursorTo } = require("readline");
const uri = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORD}@cluster0.4whmg.mongodb.net/$${process.env.DBNAME}?retryWrites=true&w=majority`
const clientDB = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Reading the commands folder
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

const sendData = (url) => {
  clientDB.connect(err => {
    if (err) console.log(err);
  
  let myobj = { url: url, title: "Mem bez nazwy"}
  clientDB.db("Data").collection("Memes").insertOne(myobj, (err) => {
    if (err) console.log(err);

  })
  })}


client.on("messageUpdate", (message, newMessage) => {
  if (
    newMessage.content.endsWith(".") &&
    newMessage.author.id == "514320067970727947"
  ) {
    newMessage.delete();
  }
});
let chan;
let stary;
client.on("voiceStateUpdate", (oldState, newState) => {
  let newUserChannel = newState.channel;
  let oldUserChannel = oldState.channel;
  let voicer = newState.member;
  if (
    oldUserChannel !== newUserChannel &&
    newUserChannel !== undefined &&
    newUserChannel !== null
  ) {
    channels.voice.map((a, ind) => {
      if (a === newUserChannel.id) {
        chan = client.channels.cache.get(channels.text[ind]);
        chan.createOverwrite(voicer, { VIEW_CHANNEL: true });
      }
      if (oldUserChannel !== null) {
        if (a === oldUserChannel.id) {
          stary = client.channels.cache.get(channels.text[ind]);
        }
      }
    });
  } else if (newUserChannel === null) {
    channels.voice.map((b, ind) => {
      if (b === oldUserChannel.id) {
        let old = client.channels.cache.get(channels.text[ind]);
        old.createOverwrite(voicer, { VIEW_CHANNEL: false });
      }
    });
    return;
  }
  if (oldUserChannel === undefined || oldUserChannel === null) return;
  if (newUserChannel !== oldUserChannel && newUserChannel !== undefined) {
    stary.createOverwrite(voicer, { VIEW_CHANNEL: false });
  }
});

client.on("message", (message) => {
  if (message.author.bot) return;

  if (message.channel.id === config.meme_id) {
    if (message.content.includes("youtube.com") || message.content.match(/\.(gif|mp4)$/)) {
      message.react("👍");
      message.react("👎");
      return;
    }

    if (message.attachments.size > 0) {
      message.react("👍");
      message.react("👎");
      message.attachments.map((attach) => {
        sendData(attach.url)
      })
    return;
  }

    if (
      message.content.match(/\.(jpeg|jpg|png)$/)
    ) {
      message.react("👍");
      message.react("👎");
      sendData(message.content)
      return;
    }
    
      else {
      message.delete();
    }
  }

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("Command error!");
  }
});

client.login(process.env.CLIENT_TOKEN);
