/* eslint-disable no-unused-vars */
module.exports = {
    name: 'embedx',
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
                if (m.content === 'pauza') {
                    collector.stop('Pauza');
                    message.channel.send('Pauzuję!')
                }
                if (m.content.length <= 256 && m.content !== 'pauza') {
                    argumenty.push(m.content);
                    if (argumenty.length == 3) {
                        if (!argumenty[2].startsWith('http')) {
                            collector.stop('Wiadomość to nie link');
                            message.reply('Wiadomość nie jest linkiem.')
                            return;
                        }
                        if (argumenty[2].match(/\.(jpeg|jpg|gif|png)$/) != null) {
                            null
                        } else {
                            message.reply('Błąd')
                            collector.stop('Link to nie zdjęcie');
                            return;
                        }
                    }

                    if (liczba <= 3) {
                        message.channel.send(wiadomosc[liczba])
                        console.log(m.content.length);
                    }


                }
                if (m.content.length > 256) {
                    collector.stop('Błąd');
                }


                liczba += 1;
            });

            collector.on('end', (collected, reason) => {
                if (reason == 'limit') {
                    console.log(reason);
                    const RobionyEmbed = new Discord.MessageEmbed()
                        .setTitle(argumenty[0])
                        .setDescription(argumenty[1])
                        .setImage(argumenty[2])
                        .setFooter(argumenty[3])
                    message.channel.send(RobionyEmbed);
                }
            })

            collector.on('end', (collected, reason) => {
                if (reason == 'time') {
                    message.channel.send('Czas na zrobienie embeda wygasł.')
                }
            });
        } else {
            message.channel.send('Brak permisji.')
        }

    },
};