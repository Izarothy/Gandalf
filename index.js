const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

const AragornEmbed = new Discord.MessageEmbed()
    .setTitle('Aragorn')
    .setDescription('Aragorn II, syn Arathorna II i Gilraeny, także znany jako Elessar i Obieżyświat, był szesnastym wodzem Dunedainów z Północy; później koronowany Królem Elessarem.')
    .setImage('https://www.indiewire.com/wp-content/uploads/2017/11/aragon-the-lord-of-the-rings.jpg')

const LegolasEmbed = new Discord.MessageEmbed()
    .setTitle('Legolas')
    .setDescription('Legolas, syn Thranduila, był elfickim księciem z Mrocznej Puszczy. Wyruszył w podróż razem z Drużyną Pierścienia, żeby zniszczyć Jedyny Pierścień.')
    .setImage('https://i.pinimg.com/originals/07/31/37/0731379032530492cec0984f06bf1318.jpg')

client.on('message', message => {
    if (message.content === `${prefix}aragorn`) {
        message.channel.send(AragornEmbed);
    }
    if (message.content === `${prefix}legolas`) {
        message.channel.send(LegolasEmbed);
    }

});

client.login(token)