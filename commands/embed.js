/* eslint-disable no-unused-vars */
module.exports = {
    name: 'embed',
    description: 'Tworzenie embeda',
    execute(message, args, client) {
        let WymienionyKanal;
        const Discord = require('discord.js');
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: 5, time: 3000000 });
        let argumenty = [];
        let liczba = 1;
        let wiadomosc = ["Podaj tytuł embeda:", "Podaj opis embeda: ", "Podaj link do zdjęcia: ", "Napisz Tawerna Fantastyki, Sekcja *twojasekcja*", "Na którym kanale ma być wysłany embed?"];
        if (message.member.roles.cache.some(role => role.name === 'Opiekun') || message.member.roles.cache.some(role => role.name === 'Moderator')) {
            message.channel.send(wiadomosc[0])
            collector.on('collect', (m) => {
                if (m.content === 'pauza') {
                    collector.stop('Pauza');
                    message.channel.send('Pauzuję!')
                }
                if (m.content !== 'pauza') {
                    argumenty.push(m.content);
                    if (argumenty[0].length >= 256) {
                        collector.stop('Za dużo w tytule.')
                        message.reply('Za dużo znaków (max. 256)')
                        return;
                    }
                    const Discord = require('discord.js');
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
                    if (argumenty.length == 5) {
                        if (message.mentions.channels.size < 99) {
                            WymienionyKanal = m.mentions.channels.first().id
                            console.log(WymienionyKanal)
                        } else {
                            console.log(message.mentions.channels.size)
                            message.reply("Błąd.")
                        }
                    } else if (liczba <= 4) {
                        message.channel.send(wiadomosc[liczba])
                        console.log(m.content.length);
                    } else if (args[4] != message.mentions) {
                        message.channel.send('Nie oznaczyłeś kanału')
                    }

                }
                if (args[0] > 256) {
                    collector.stop('Błąd');
                    message.reply('Za dużo.')
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
                    client.channels.cache.get(WymienionyKanal).send(RobionyEmbed);
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