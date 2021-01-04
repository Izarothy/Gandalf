/* eslint-disable no-unused-vars */
module.exports = {
    name: 'boromir',
    description: 'Boromir embed',
    execute(message, args) {
        const Discord = require('discord.js');
        const BoromirEmbed = new Discord.MessageEmbed()
            .setTitle('Boromir')
            .setDescription('Boromir - człowiek, syn Denethora i Finduilas. Kapitan Gondoru, brat Faramira. Był od brata, z którym byli mocno związani, o 5 lat starszy. Wyrósł na wielkiego wojownika ludzi, a podczas Wojny o Pierścień wziął udział w wyprawie do Mordoru razem z Drużyną Pierścienia. Poległ, broniąc hobbitów, tym samym odkupując winy, szczególnie omamienie pierścieniem władzy. ')
            .setImage('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lord-of-the-rings-sean-bean-boromir-1584636601.jpg')
            .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
            .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')
        message.channel.send(BoromirEmbed);
    },
};