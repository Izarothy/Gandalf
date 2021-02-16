/* eslint-disable no-unused-vars */
module.exports = {
    name: 'komendyh',
    description: 'Lista komend do MC',
    execute(message, args, client) {
        const Discord = require('discord.js');
        client.channels.cache.get('601363034908131328').send('__**Spis przydatnych komend do MC:**__: \
        \n \n :one: **Sadzenie i WorldEdit** \
        \n Sadzenie np. pszenicy: \
        \n ``/mask >farmland`` - ustawienie maski pędzla, żeby malował tylko na farmlandzie \
        \n ``/brush cyl x(blok) y(promień pędzla)`` - pędzel, który będzie malował używając maski z powyżej \
        \n I klikamy prawym, przykładowy użytek: ``/brush cyl 59:7 5`` - malowanie urośniętej pszenicy z promieniem 5. \
        \n \n **ID nasion: ** \
        \n Pszenica - 59:x (gdzie x to poziom rozrostu), 59:1, 59:2, 59:3, 59:4, 59:5, 59:6, 59:7 \
        \n Ziemniaki - 142:x, tak jak wyżej \
        \n Marchew - 141:x, tak jak wyżej \
        \n \n Można też robić miksowane pole, np. używając ``/brush cyl 59:1,59:2,59:3,59:4 5`` - będzie kilka etapów. \
        \n \n :two: **Reszta komend** \
        \n ``/lotr time set (day/night lub liczba)`` - ustawienie pory dnia w Śródziemiu \
        \n ``/gamerule randomTickSpeed (od 0 do 1000)`` - prędkość wykonywania się rzeczy np. rośnięcia drzew lub pszenicy \
        ')
    },
};