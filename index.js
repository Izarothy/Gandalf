/* eslint-disable no-unused-vars */
const fs = require("fs");
require("dotenv").config();
const Discord = require("discord.js");
const config = require("./config.json");
const { prefix } = require("./config.json");
const channels = require("./json/channels.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const schedule = require('node-schedule')

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("The bot is working.");
  const fetchMessages = async () => {
    const pageTextChannelID = '874210436394917928';
    const pageTextChannel = client.channels.cache.get(pageTextChannelID);
    return await pageTextChannel.messages.fetch({});
  }

  const sendDailyPage = schedule.scheduleJob('* 16 * * *', () => {
    fetchMessages().then(messages => {
      let todaysMessage = messages.last()
      todaysPage = todaysMessage.content;
      todaysMessage.delete();
      const dailyEmbed = new Discord.MessageEmbed()
    .setThumbnail('https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1354628173l/16234338.jpg')
    .setTitle('**Tłumaczenie HoME - Tom XII**')
    .setDescription(todaysPage)
    .setFooter('Jeśli chcesz nam pomóc przy tłumaczeniu, śmiało - jeśli trzeba będzie coś zrobić, będzie to napisane na kanale.')
    const channel = client.channels.cache.get('781283271635632138'); 
    channel.send(dailyEmbed)})
  })
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
        return; }
      
    // Image link
    if (message.content.match(/\.(jpeg|jpg|png)$/)) {
      memeReact();
      return} 

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

client.login(process.env.CLIENT_TOKEN);
