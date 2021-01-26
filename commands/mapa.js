/* eslint-disable no-unused-vars */
module.exports = {
    name: 'mapa',
    description: 'Mapa Śródziemia',
    execute(message, args) {
        const Discord = require('discord.js');
        let srodziemie = ['781283271635632138', '484683452206153729', '782322780460548106', '484655342400307211'];
        if (srodziemie.includes(message.channel.id)) {
            message.channel.send('https://i.pinimg.com/originals/ac/9b/41/ac9b41bd405e7c5b67ab9412c958c586.jpg')
        } else {
            console.log('Zły kanał')
        }
    },
};