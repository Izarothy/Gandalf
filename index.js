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

client.once('ready', () => {
    console.log('Ready!');
});
var d = schedule.scheduleJob('* 0 7 * * *', function() {
    client.channels.cache.get('484645229371064334').send('Dzień Dobry Tawerna!');
})
var p = schedule.scheduleJob('* 0 20 * * *', function() {
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
        .setImage('https://bi.im-g.pl/im/1f/4e/12/z19197727V,Premier-Beata-Szydlo-i-czlonkowie-jej-gabinetu-prz.jpg')
        .setFooter('Tawerna Fantastyki, Polityka')
    client.channels.cache.get('613987578567196712').send(kadencjaEmbed);
});

client.on('message', message => {

    if (message.content === 'Thauron' || message.content === 'thauron') {
        message.channel.send('PIJEMY?');
    }

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