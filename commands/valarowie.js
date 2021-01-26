/* eslint-disable no-unused-vars */
module.exports = {
    name: 'valarowie',
    description: 'Drzewo genealogiczne Valarów',
    execute(message, args) {
        const Discord = require('discord.js');
        let srodziemie = ['781283271635632138', '484683452206153729', '782322780460548106', '484655342400307211'];
        if (srodziemie.includes(message.channel.id)) {
            message.channel.send('https://cdn.discordapp.com/attachments/484655342400307211/803678948353114212/Pary_Ainurow.png')
        } else {
            console.log('Zły kanał')
        }
    },
};