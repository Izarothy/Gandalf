/* eslint-disable no-unused-vars */
module.exports = {
    name: 'gimli',
    description: 'Gimli embed',
    execute(message, args) {
        const Discord = require('discord.js')
        const GimliEmbed = new Discord.MessageEmbed()
            .setTitle('Gimli')
            .setDescription('Gimli, syn Gloina - krasnolud z Rodu Durina. Podczas gdy jego ojciec wyruszał z Thorinem by odzyskać Erebor, jemu nie pozwolono, gdyż - jako 62-latek - był za młody. Wyruszył z Drużyną Pierścienia na wyprawę do Mordoru, gdzie zaprzyjaźnił się na całe życie z Legolasem. Warto też wspomnieć, że został przyjacielem elfów, co było niesamowicie rzadkie wśród krasnoludów. Umiłował Aglarond, czyli jaskinie obok Helmowego Jaru i w 120 roku Czwartej Ery odpłynął do Amanu.')
            .setImage('https://static.wikia.nocookie.net/lotr/images/e/ec/Gimli_-_FOTR.png/revision/latest?cb=20121008105956')
            .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
            .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')
        message.channel.send(GimliEmbed);
    },
};