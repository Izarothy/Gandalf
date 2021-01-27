/* eslint-disable no-unused-vars */
module.exports = {
    name: 'pij_input',
    description: 'Branie inputu od Thaurona',
    execute(message, args, client) {
        const Discord = require('discord.js');
        if (message.author.id == ('219486784499875841')) {
            let kolekcja = [];
            if (!args.length) {
                return message.channel.send('Nie podałeś argumentów!');
            } else {
                let ajdi = message.mentions.users.first();
                message.client.channels.cache.get('484655342400307211').send(`<@297508865891762176> Dopisz ${ajdi.id}`);
            }
        } else {
            message.channel.send('Brak permisji.')
        }
    },
};