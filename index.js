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

// Startup log and message
client.once("ready", () => {
  console.log("The bot is working.");
  client.users.fetch('297508865891762176').then((user) => {
    user.send(`I'm working.`)
  })
});

// Function to insert an object containing sent meme
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

// Assign a text channel to a voice channel
client.on("voiceStateUpdate", (oldState, newState) => {
  let newUserChannel = newState.channel;
  let oldUserChannel = oldState.channel;
  let newUser = newState.member;
  let old;
  if (
    oldUserChannel !== newUserChannel &&
    newUserChannel !== undefined &&
    newUserChannel !== null) {
    channels.voice.map((channel, ind) => {
      if (channel === newUserChannel.id) {
        let chan = client.channels.cache.get(channels.text[ind]);
        chan.createOverwrite(newUser, { VIEW_CHANNEL: true });
        console.log(`I've added permissions for ${newUser.displayName} (channel ${chan})`)
      }
      if (oldUserChannel !== null && channel === oldUserChannel.id) {
          return old = client.channels.cache.get(channels.text[ind]);
      }
    });
  } else if (newUserChannel === null) {
    channels.voice.map((channel, ind) => {
      if (channel === oldUserChannel.id) {
        old = client.channels.cache.get(channels.text[ind]);
        old.createOverwrite(newUser, { VIEW_CHANNEL: false });
        console.log(`I've removed permissions for ${newUser.displayName} (channel ${old})`)
      }
    });
    return;
  }
  if (oldUserChannel === undefined || oldUserChannel === null) return;
  if (newUserChannel !== oldUserChannel && newUserChannel !== undefined) {
    old.createOverwrite(newUser, { VIEW_CHANNEL: false });
    console.log(`I've removed permissions for ${newUser.displayName} (channel ${old})`)
  }
});

client.on("message", (message) => {
  //To prevent looping
  if (message.author.bot) return;

  //A function to react to memes
  const memeReact = () => {
    message.react("👍");
    message.react("👎");
  }

  //Check meme channel and react appropriately


  //Video 
  if (message.channel.id === config.meme_id) {
    if (message.content.includes("youtube.com") || message.content.match(/\.(gif|mp4)$/)) {
      memeReact();
      return; }
    
    // Image attachment
    if (message.attachments.size > 0) {
      memeReact();
      message.attachments.map((attach) => {
        sendData(attach.url)})
        return; }
      
    // Image link
    if (message.content.match(/\.(jpeg|jpg|png)$/)) {
      memeReact();
      sendData(message.content)
      return;} 

      else {
      message.delete(); }}

  //Check if message is a command
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();


  //Read commands
  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("Command error!");
  }
});

//Log in with environmental data
client.login(process.env.CLIENT_TOKEN);
