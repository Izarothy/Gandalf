/* eslint-disable no-unused-vars */
module.exports = {
    name: 'arwena',
    description: 'Arwena',
    execute(message, args) {
        const Discord = require('discord.js');
        const ArwenaEmbed = new Discord.MessageEmbed()
            .setTitle('Arwena')
            .setDescription('Do napisania ')
            .setImage('')
            .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
            .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')
        message.channel.send(ArwenaEmbed);
    },
};