const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

const AragornEmbed = new Discord.MessageEmbed()
    .setTitle('Aragorn')
    .setDescription('Aragorn II, syn Arathorna II i Gilraeny, także znany jako Elessar i Obieżyświat, był szesnastym wodzem Dunedainów z Północy; później koronowany Królem Elessarem.')
    .setImage('https://www.indiewire.com/wp-content/uploads/2017/11/aragon-the-lord-of-the-rings.jpg')

client.on('message', message => {
    if (message.content === '!aragorn') {
        message.channel.send(AragornEmbed);
    }
});

client.login('Nzk1MzA2MDAzMjkzMjc0MTEy.X_Hcbw.j1rtIFheIYw1HC01wOtW2cn-SYw');