/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
let listaLike = []
let listaDislike = []
module.exports = {
    name: 'liczbalajko',
    description: 'Mems reaction count',
    async execute(message, args, client) {
        await client.channels.cache.get('484659760201728001').messages.fetch({ limit: 100, before: args[0], })
            .then(chan => {
                chan.array().forEach((mem, index) => {
                    const reactionz = mem.reactions.cache;
                    let liczbaLike = ' ' + reactionz.get('682354930857541790').count
                    let liczbaDislike = ' ' + reactionz.get('682354993113595936').count

                    listaLike.push(liczbaLike)
                    listaDislike.push(liczbaDislike)

                    if (index == 99) {
                        const embedo = new Discord.MessageEmbed()
                            .setTitle('Największa liczba memów spośród 100 ostatnich: ')
                            .setDescription('Największa liczba lajków z 100 memów to: ' + Math.max.apply(null, listaLike) + '\n \
                            Największa liczba dislajków z 100 memów to: ' + Math.max.apply(null, listaDislike))
                            .setFooter('Jeśli chcesz sprawdzić poprzednie 100 memów, wpisz: !liczbalajkow ' + mem.id)
                            .setImage('https://i1.wp.com/media.globalnews.ca/videostatic/297/599/successkid_thumb.jpg?w=1040&quality=70&strip=all')
                        message.channel.send(embedo)
                    }
                })
            })

    },
};