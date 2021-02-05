/* eslint-disable no-unused-vars */
module.exports = {
    name: 'zglos',
    description: 'Zglaszanie quizu',
    execute(message, args, client) {
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: 4, time: 60000 });
        const Discord = require('discord.js');
        let argumenty = [];
        let liczba = 1;
        let wiadomosc = ["Kto poprowadzi quiz?", "Która sekcja?", "Data i godzina: ", "Dodatkowe informacje: "]
        if (message.member.roles.cache.some(role => role.name === 'Opiekun') || message.member.roles.cache.some(role => role.name === 'Moderator')) {
            message.channel.send(wiadomosc[0])
            collector.on('collect', (m) => {
                argumenty.push(m.content);
                if (liczba < 4) {
                    message.channel.send(wiadomosc[liczba]);
                }
                liczba += 1;
                console.log(argumenty);
            });
            collector.on('end', data => {
                const QuizEmbed = new Discord.MessageEmbed()
                    .setTitle(`Ogłoszono nowy quiz!`)
                    .setFooter(`Tawerna Fantastyki`)
                    .setImage('https://cdn.discordapp.com/attachments/804090885355864064/807342167000612904/758007.jpg')
                    .addFields({ name: 'Prowadzący: ', value: argumenty[0], inline: true }, { name: 'Sekcja: ', value: argumenty[1], inline: true }, { name: 'Data i godzina: ', value: argumenty[2], inline: true }, { name: 'Opis: ', value: argumenty[3], })
                client.channels.cache.get('804038483810713650').send(QuizEmbed);
            })
        } else {
            message.channel.send('Brak permisji.')
            return;
        }
    },
};