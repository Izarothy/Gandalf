/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
let listaLike = []
let listaDislike = []
module.exports = {
    name: 'liczbalajkow',
    description: 'Mems reaction count',
    async execute(message, args, client) {
        await client.channels.cache.get('484659760201728001').messages.fetch({ limit: 100, before: args[0], })
            .then(chan => {
                chan.forEach((mem, index) => {
                    const reactionz = mem.reactions.cache;
                    let liczbaLike = ' ' + reactionz.get('682354930857541790').count
                    let liczbaDislike = ' ' + reactionz.get('682354993113595936').count

                    listaLike.push(liczbaLike)
                    listaDislike.push(liczbaDislike)
                })
            })
        message.reply('Największa liczba lajków z 100 memów to: ' + Math.max.apply(null, listaLike) + '\n')
        message.reply('Największa liczba dislajków z 100 memów to: ' + Math.max.apply(null, listaDislike))

    },
};