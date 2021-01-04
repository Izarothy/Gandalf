/* eslint-disable no-unused-vars */
module.exports = {
    name: 'legolas',
    description: 'Legolas embed',
    execute(message, args) {
        const Discord = require('discord.js')
        const LegolasEmbed = new Discord.MessageEmbed()
            .setTitle('Legolas')
            .setDescription('Legolas, syn Thranduila, był elfickim księciem z Mrocznej Puszczy. Wyruszył w podróż razem z Drużyną Pierścienia, żeby zniszczyć Jedyny Pierścień. Jako elf miał doskonały wzrok, tym samym znacznie przysługując się Drużynie. Zaprzyjaźnił się z Gimlim pomimo różnic, jakie dzieliły ich rasy. Nic nie wiemy o jego matce. Na spotkanie u Elronda przyszedł jako wysłannik ojca. Po zakończeniu Wojny o Pierścień został na koronacji Aragorna i po zwiedzeniu wraz z Gimlim jaskiń Helmowego Jaru i Fangornu odpłynął do Amanu. ')
            .setImage('https://wegotthiscovered.com/wp-content/themes/wgtc_v2/resizer/resizer.php?file=uploads/Legolas-579x360.jpg&height=746.11398963731&width=1200&action=resize')
            .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
            .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')
        message.channel.send(LegolasEmbed);
    },
};