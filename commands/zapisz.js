/* eslint-disable no-unused-vars */

module.exports = {
    name: 'zapisz',
    description: 'Zapisywanie kogoś',

    execute (message, args) {
        let rolaGracz = message.guild.roles.cache.find(role => role.name === "Gracz");
        let klient = message.mentions.members.first()
        
        klient.roles.add(rolaGracz)

        console.log(klient.roles)

    }
    
};