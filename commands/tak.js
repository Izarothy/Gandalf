/* eslint-disable no-unused-vars */
module.exports = {
    name: 'tak',
    description: 'Gimli embed',
    execute(message, args) {
        const Discord = require('discord.js')
        const GimliEmbed = new Discord.MessageEmbed()
            .setTitle('**Lorem ipsum**')
            .setDescription(' :point_right: Lorem ipsum - Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum \
            \n :point_right: Lorem ipsum - Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum \
            \n :point_right: Lorem ipsum - Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum \
            \n :point_right: Lorem ipsum - Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ')
        message.channel.send(GimliEmbed);
    },
};