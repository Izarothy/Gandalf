/* eslint-disable no-unused-vars */
module.exports = {
    name: 'Frodo',
    description: 'Frodo embed',
    execute(message, args) {
        const Discord = require('discord.js');
        const FrodoEmbed = new Discord.MessageEmbed()
            .setTitle('Frodo')
            .setDescription('Frodo Baggins - hobbit z Shire, syn Drogo. Jest bardzo istotną postacią III Ery, bowiem był Powiernikiem Pierścienia. Jego wujek, Bilbo, przygarnął go po tym, jak jego rodzice zatonęli płynąc łodzią. Gandalf polecił mu pójść z pierścieniem do Bree, co też zrobił. Spotkał tam Aragorna, a po drodze do Rivendell - na Wichrowym Czubie - został poważnie raniony przez Nazguli. Zaniósł Pierścień do Mordoru, gdzie ostatecznie go zniszczył i pokonał Saurona.  ')
            .setImage('https://img1.looper.com/img/gallery/frodo-baggins-entire-backstory-explained/intro-1582640416.jpg')
            .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
            .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')
        message.channel.send(FrodoEmbed);
    },
};