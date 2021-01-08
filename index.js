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
var date = new Date(2021, 0, 8, 17, 0, 0);

client.once('ready', () => {
    console.log('Ready!');
});

const PostacEmbed = new Discord.MessageEmbed()
    .setTitle('Nowy embed')
    .setDescription('Dzisiaj na celowniku mamy Golluma / Smeagola! Chętnych do stworzenia jego historii zapraszamy do wysyłania kluczowych informacji o tej postaci oraz do podjęcia decyzji o najlepszej jego grafice.')
    .setImage('https://pyxis.nymag.com/v1/imgs/5d4/f6e/c6aeaba039ba41d69a9dbce8c3523ec471-11-gollum.rsquare.w1200.jpg')
    .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
    .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')

let j = schedule.scheduleJob(date, function() {
    client.channels.cache.get('781283271635632138').send(PostacEmbed);
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