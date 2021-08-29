const Discord = require('discord.js')
const minecraftMessage = require('../json/messages.json').minecraft
const config = require('../config.json')
module.exports = {
    name: "minecraft",
    description: '',
    execute (message, args, client) {
        message.delete()
        if (message.channel.id !== config.minecraft_id) return;

        const MinecraftEmbed = new Discord.MessageEmbed()
        .setColor(minecraftMessage.color)
        .setTitle(minecraftMessage.title)
        .setDescription(minecraftMessage.description)
        .setThumbnail(minecraftMessage.thumbnail)
        message.channel.send(MinecraftEmbed)
    }
}
