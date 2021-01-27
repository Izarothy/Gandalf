/* eslint-disable no-unused-vars */
module.exports = {
    name: 'embed',
    description: 'Tworzenie embeda',
    execute(message, args, client) {
        const Discord = require('discord.js');
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: 4, time: 3000000 });
        let argumenty = [];
        let liczba = 1;
        let wiadomosc = ["Podaj tytuł embeda:", "Podaj opis embeda: ", "Podaj link do zdjęcia: ", "Napisz Tawerna Fantastyki, Sekcja *twojasekcja*"];
        if (message.member.roles.cache.some(role => role.name === 'Opiekun') || message.member.roles.cache.some(role => role.name === 'Moderator')) {
            message.channel.send(wiadomosc[0])
            collector.on('collect', (m) => {
                argumenty.push(m.content);
                if (liczba < 4) {
                    message.channel.send(wiadomosc[liczba]);
                }
                liczba += 1;
            });
            collector.on('end', data => {
                const RobionyEmbed = new Discord.MessageEmbed()
                    .setTitle(argumenty[0])
                    .setDescription(argumenty[1])
                    .setImage(argumenty[2])
                    .setFooter(argumenty[3])
                message.channel.send(RobionyEmbed);
            })
        }
    },
};