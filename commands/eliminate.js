/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
module.exports = {
    name: 'likwidacja',
    description: 'Eliminacja',
    async execute(message, args, client) {
        const members = await message.guild.members.fetch()
        const ta = members.find((mem) => {
            let nick = args[0]
            if (mem.displayName.toLowerCase().includes(nick.toLowerCase()) && (message.member.roles.cache.some(role => role.name === 'Administrator'))) {
                mem.setNickname(mem.displayName.replace(nick, 'Eliminated'));
            }
            return false;
        })
    },
};