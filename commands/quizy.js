/* eslint-disable no-unused-vars */
module.exports = {
    name: 'quizy',
    description: 'Lista quizów',
    execute(message, args) {
        const Discord = require('discord.js');

        let quiz1 = 'https://cutt.ly/0jNDDQa'
        let quiz2 = 'https://cutt.ly/mjNDFPI'
        let quiz3 = 'https://cutt.ly/DjNDGgk'
        let quiz4 = 'https://cutt.ly/pjNDXb6'
        let quiz5 = 'https://cutt.ly/KjNDVmh'
        let quiz6 = 'https://cutt.ly/EjNDBWs'
        let quiz7 = 'https://cutt.ly/XjNDNUA'
        let quiz8 = 'https://cutt.ly/bjNDMt1'
        let quiz9 = 'https://cutt.ly/sjNDMOk'
        let quiz10 = 'https://cutt.ly/fjND1ex'
        let quiz11 = 'https://cutt.ly/tjND1Fl'

        const QuizyEmbed = new Discord.MessageEmbed()
            .setTitle('Lista quizów Tawerny Fantastyki (tolkienowskie)')
            .setDescription(` 
 :one: ${quiz1} - 30 pytań 
:two: ${quiz2} - 30 pytań
:three: ${quiz3} - 30 pytań
:four: ${quiz4} - 30 pytań 
:five: ${quiz5} - 20 pytań 
:six: ${quiz6} - 30 pytań 
:seven: ${quiz7} - 30 pytań 
:eight: ${quiz8} - 25 pytań 
:nine: ${quiz9} - 30 pytań 
:one::zero: ${quiz10} - 101 pytań 
:one::one: ${quiz11} - 40 pytań `)
            .setFooter('Tawerna Fantastyki, Sekcja Śródziemie')
            .setImage('https://media.discordapp.net/attachments/584007309114736650/802942411990368286/Ciemna_mapa_Srodziemia.jpg?width=1082&height=676')
        message.channel.send(QuizyEmbed);
    },
};