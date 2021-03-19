/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
let listaLike = []
let listaDislike = []
var duzo
var malo
module.exports = {
    name: 'liczbalajkow',
    description: 'Mems reaction count',
    async execute(message, args, client) {
        await client.channels.cache.get('484659760201728001').messages.fetch({ limit: 100, before: args[0], })
            .then(chan => {
                chan.array().forEach((mem, index) => {
                    const reactionz = mem.reactions.cache;
                    try {
                        var liczbaLike = reactionz.get('682354930857541790').count
                        var liczbaDislike = reactionz.get('682354993113595936').count
                        listaLike.push(liczbaLike)
                        listaDislike.push(liczbaDislike)

                        var duzo = Math.max.apply(null, listaLike)
                        var malo = Math.max.apply(null, listaDislike)

                        if (index == 99) {
                            const embedo = new Discord.MessageEmbed()
                                .setTitle('Największa liczba memów spośród 100 ostatnich: ')
                                .setDescription('Największa liczba lajków z 100 memów to: ' + duzo + '\n \
                                \
                            Największa liczba dislajków z 100 memów to: ' + malo)
                                .setFooter('Jeśli chcesz sprawdzić poprzednie 100 memów, wpisz: !liczbalajkow ' + mem.id)
                                .setImage('https://media1.tenor.com/images/cc7f226783133f6088c33e871a048c2e/tenor.gif?itemid=3551563')
                            message.channel.send(embedo)
                            listaLike = []
                            listaDislike = []
                            chan.array().forEach((memd) => {
                                const reactionb = memd.reactions.cache;
                                if (reactionb.get('682354930857541790')) {
                                    if (reactionb.get('682354930857541790').count === duzo) {
                                        message.channel.send('Link do wiadomości z memem o największej liczbie lajków: ' + memd.url)
                                    }
                                    if (reactionb.get('682354993113595936').count === malo) {
                                        message.channel.send('Link do wiadomości z memem o największej liczbie dislajków: ' + memd.url)
                                        malo = 'XDDDD'
                                    }
                                }
                            })
                        }
                    } catch (TypeError) { console.log('error') }
                })
            })
    },
};