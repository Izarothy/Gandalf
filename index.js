/* eslint-disable no-unused-vars */
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
var schedule = require('node-schedule');
var date = new Date(2021, 0, 5, 16, 12, 0);

client.once('ready', () => {
    console.log('Ready!');
});

var j = schedule.scheduleJob(date, function() {
    client.channels.cache.get('781283271635632138').send('**2. Kto jest Twoją ulubioną postacią z Trzeciej Ery? Wybór proszę uzasadnić.**');
})

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});
client.login(config.token)