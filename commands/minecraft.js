/* eslint-disable no-unused-vars */
module.exports = {
    name: 'minecraft',
    description: 'Minecraft Opis',
    execute(message, args) {
        const Discord = require('discord.js');

        let launcher = "https://skmedix.pl/sklauncher/downloads";
        let forge = "https://files.minecraftforge.net/maven/net/minecraftforge/forge/1.15.2-31.2.47/forge-1.15.2-31.2.47-mdk.zip";
        let mod = "https://www.curseforge.com/minecraft/mc-mods/the-lord-of-the-rings-mod-renewed";

        const Minecraft = new Discord.MessageEmbed()
            .setTitle('Poradnik i ważne linki do naszego serwera Minecraft')
            .setDescription('\n Polecany launcher non-premium: ' + launcher +
                '\n \n Forge: ' + forge +
                '\n \n Mod: ' + mod +
                '\n \n IP: tawernasrodziemie.tasrv.com' +
                '\n \n 1. Pobieracie launcher (oficjalny lub ten z wyżej)' +
                '\n 2. Instalujecie wersję **1.15.2** Minecrafta' +
                '\n 3. Po zainstalowaniu wychodzicie i instalujecie Forge z linku powyżej' +
                '\n 4. Wchodzicie w %appdata%, .minecraft i wrzucacie plik .jar (mod) do folderu mods - jeśli go nie ma, po prostu trzeba stworzyć.' +
                '\n Jeśli są jakieś problemy techniczne, choć nie powinno, prosimy pisać do @Izaroth#6666!'
            )
            .setFooter('Tawerna Fantastyki, Serwer Minecraft')
            .setImage('https://cdn.discordapp.com/attachments/484645229371064334/795295572327923712/unknown.png')
            .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')
        message.channel.send(Minecraft)
    },
};