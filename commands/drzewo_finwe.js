/* eslint-disable no-unused-vars */
module.exports = {
    name: 'drzewo_finwe',
    description: 'Drzewo genealogiczne Finwego',
    execute(message, args) {
        const Discord = require('discord.js');
        let srodziemie = ['781283271635632138', '484683452206153729', '782322780460548106', '484655342400307211'];
        if (srodziemie.includes(message.channel.id)) {
            message.channel.send('https://i.stack.imgur.com/CjHA4.jpg')
        } else {
            console.log('Zły kanał')
        }
    },
};