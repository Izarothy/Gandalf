/* eslint-disable no-unused-vars */
const fs = require("fs");
require("dotenv").config();
const Discord = require("discord.js");
const config = require("./config.json");
const { prefix } = require("./config.json");
const channels = require("./json/channels.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}
var schedule = require("node-schedule");
const { deepEqual } = require("assert");
const { title } = require("process");

client.once("ready", () => {
  console.log("Ready!");
});

var d = schedule.scheduleJob("0 0 7 * * *", function () {
  client.channels.cache.get("484645229371064334").send("Dzień Dobry Tawerna!");
});

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

  if (message.channel.id === "484659760201728001") {
    if (
      message.content.match(/\.(jpeg|jpg|gif|png|mp4)$/) !== null ||
      message.content.includes("youtube.com") ||
      message.attachments.size > 0 ||
      message.content.startsWith("https://")
    ) {
      message.react("👍");
      message.react("👎");
      return;
    } else {
      message.delete();
    }
  }
  if (message.content === "Witam" || message.content === "witam") {
    if (
      message.author.id == "297508865891762176" ||
      message.author.id == "219486784499875841" ||
      message.author.id == "327533594622951428"
    )
      return;
    if (
      message.author.id === "514320067970727947" ||
      message.author.id === "284038235364130817" ||
      message.author.id === "589749718305865733"
    ) {
      for (let i = 1; i < 5; i++) {
        message.author.send("NIE SPAMUJ CHUJU ");
      }
    }
  }
  if (message.author.id == "514320067970727947") {
    if (
      message.content.endsWith(".") ||
      message.content.includes("tenor.com")
    ) {
      message.delete();
    }
  }
  if (message.content === "beza") {
    message.channel.send(
      "https://static.smaker.pl/photos/1/0/c/10ce9c79704da425b1137eb609b9eff4_369483_5b3d0a0b217ef_wm.jpg"
    );
  }
  if (
    message.content.toLowerCase().includes("chamie") &&
    message.author.id == "514320067970727947"
  ) {
    message.delete();
    message.reply("Sam jesteś cham, chamie.");
    let rola = "781254407320895488";
    message.member.roles.add(rola);
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
