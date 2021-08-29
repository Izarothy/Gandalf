const Discord = require('discord.js')
module.exports = {
    name: "edit",
    description: '',
    execute (message, args, client) {
        let newMsg = '\n<:minecraft:821341350913769512> - <@&817096803194765322> \
        \n<:bos2:821340849467949068> - <@&821340454397411369> \
        \n<:lol:821341779017596948> - <@&817096864566214708> \
        \n<:warcraft3:821342057762521168> - <@&817098529574486077> \
        \n<:hearthstone:821341259477549087> - <@&817095647370674207> \
        \n<:wow:821342531450175518> - <@&817108416303857729>\
        \n<:csgo:443869252445929493> - <@&841346132407877693> \
        \n<:sot:859073583577563147> - <@&859073192621506570>\
        \n<:gwint:880753350646300672> - <@&880744509061869569>';

        client.channels.cache.get('816980538262028298').messages.fetch('821342664753807361').then((msg) => {
            const newEmbed = new Discord.MessageEmbed()
            .setTitle('**2. Rangi gier**')
            .setDescription(newMsg)
            msg.edit(newEmbed)
        })
    }
}
