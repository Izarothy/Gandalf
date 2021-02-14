/* eslint-disable no-unused-vars */
const fs = require('fs');
require("dotenv").config();
const Discord = require('discord.js');
const config = require('./config.json');
const { prefix } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
var schedule = require('node-schedule');

client.once('ready', () => {
    console.log('Ready!');
});

var d = schedule.scheduleJob('0 0 7 * * *', function() {
    client.channels.cache.get('484645229371064334').send('Dzień Dobry Tawerna!');
})
var p = schedule.scheduleJob('0 0 20 * * *', function() {
    const liczbaDuda = 1679;
    const liczbaPis = 1034;
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    let zostaloDuda = liczbaDuda - day;
    let zostaloPis = liczbaPis - day;
    const kadencjaEmbed = new Discord.MessageEmbed()
        .setDescription('Zostało: **\n\n' +
            zostaloDuda + ' **dni do końca kadencji Andrzeja Dudy \n' +
            'oraz **' + zostaloPis + '** dni do końca kadencji obecnego sejmu.')
        .setImage('https://ocdn.eu/pulscms-transforms/1/3TuktkpTURBXy84NzQ5ZmE3OTk4YTcyY2I5NWY0NTkzNjQ2ODA1NWM4OS5qcGeSlQPNAQsAzQQqzQJYkwXNAaTNASw')
        .setFooter('Tawerna Fantastyki, Polityka')
    client.channels.cache.get('613987578567196712').send(kadencjaEmbed);
});

client.on('messageUpdate', (message, newMessage) => {
    if (newMessage.content.endsWith('.') && newMessage.author.id == '514320067970727947') {
        newMessage.delete();
    }
})

client.on('message', message => {

    if (message.author.bot) return;

    if (message.content === 'Witam' || message.content === 'witam') {
        if (message.author.id == '297508865891762176' || message.author.id == '219486784499875841' || message.author.id == '327533594622951428') return;
        message.channel.send('Wita to się gospodarz <:hyhy:569817926325108756> ')
    }
    if (message.content.endsWith('.') && message.author.id == '514320067970727947') {
        message.delete();
    }
    if (message.content.toLowerCase().includes('chamie') && message.author.id == '514320067970727947') {
        message.delete();
        message.reply('Sam jesteś cham, chamie.')
        let rola = '781254407320895488'
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
        message.reply('there was an error trying to execute that command!');
    }
});


client.login(process.env.CLIENT_TOKEN);