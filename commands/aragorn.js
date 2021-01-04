/* eslint-disable no-unused-vars */
module.exports = {
    name: 'aragorn',
    description: 'Aragorn embed',
    execute(message, args) {
        const Discord = require('discord.js');
        const AragornEmbed = new Discord.MessageEmbed()
            .setTitle('Aragorn')
            .setDescription('Aragorn II, syn Arathorna II i Gilraeny, także znany jako Elessar i Obieżyświat, był szesnastym, ostatnim, wodzem Dunedainów z Północy; później koronowany Królem Elessarem. Był dziedzicem tronu Gondoru w prostej linii. Wyruszył na wyprawę z Drużyną Pierścienia, która skończyła się dla niego sukcesem. Po wojnie zjednoczył królestwa Arnoru i Gondoru, a także włączył w protekcję Shire. ')
            .setImage('https://www.indiewire.com/wp-content/uploads/2017/11/aragon-the-lord-of-the-rings.jpg')
            .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
            .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')
        message.channel.send(AragornEmbed);
    },
};