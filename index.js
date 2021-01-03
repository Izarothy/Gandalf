const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

const exampleEmbed = new Discord.MessageEmbed()
    .setTitle('Aragorn')
    .setDescription('Aragorn II, son of Arathorn II and Gilraen, also known as Elessar and Strider, was the 16th Chieftain of the Dúnedain of the North; later crowned King Elessar Telcontar (March 1, 2931 - FO 120 or SR 1541), the 26th King of Arnor and 35th King of Gondor - and first High King of Gondor and Arnor since the short reign of Isildur. ')
    .setImage('https://www.indiewire.com/wp-content/uploads/2017/11/aragon-the-lord-of-the-rings.jpg')

client.on('message', message => {
    if (message.content === '!aragorn') {
        message.channel.send(exampleEmbed);
    }
});

client.login('Nzk1MzA2MDAzMjkzMjc0MTEy.X_Hcbw.3q-F9FPppfxSQsaQzA6q0xr0ig4');