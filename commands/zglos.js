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
                    .setImage('https://images.squarespace-cdn.com/content/v1/5a173f16ace86416b07c25f1/1513939530902-DILPHAAJ9F0DI627449M/ke17ZwdGBToddI8pDm48kK0QKSDttGV1ap9dyeIseHF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mxU0godxi02JM9uVemPLqw3ZQRv6tY2V6nZIOWGhJ3qaH6uCpMgOc4rPl-G2eiFCQ/fantasy+album+cover6+-+in+wide+format.jpg?format=1500w')
                    .addFields({ name: 'Prowadzący: ', value: argumenty[0], inline: true }, { name: 'Sekcja: ', value: argumenty[1], inline: true }, { name: 'Data i godzina: ', value: argumenty[2], inline: true }, { name: 'Opis: ', value: argumenty[3], })
                client.channels.cache.get('804038483810713650').send(QuizEmbed);
            })
        } else {
            message.channel.send('Brak permisji.')
            return;
        }
    },
};