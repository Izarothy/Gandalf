const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

const AragornEmbed = new Discord.MessageEmbed()
    .setTitle('Aragorn')
    .setDescription('Aragorn II, syn Arathorna II i Gilraeny, także znany jako Elessar i Obieżyświat, był szesnastym, ostatnim, wodzem Dunedainów z Północy; później koronowany Królem Elessarem. Był dziedzicem tronu Gondoru w prostej linii. Wyruszył na wyprawę z Drużyną Pierścienia, która skończyła się dla niego sukcesem. Po wojnie zjednoczył królestwa Arnoru i Gondoru, a także włączył w protekcję Shire. ')
    .setImage('https://www.indiewire.com/wp-content/uploads/2017/11/aragon-the-lord-of-the-rings.jpg')
    .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
    .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')

const LegolasEmbed = new Discord.MessageEmbed()
    .setTitle('Legolas')
    .setDescription('Legolas, syn Thranduila, był elfickim księciem z Mrocznej Puszczy. Wyruszył w podróż razem z Drużyną Pierścienia, żeby zniszczyć Jedyny Pierścień. Jako elf miał doskonały wzrok, tym samym znacznie przysługując się Drużynie. Zaprzyjaźnił się z Gimlim pomimo różnic, jakie dzieliły ich rasy. Nic nie wiemy o jego matce. Na spotkanie u Elronda przyszedł jako wysłannik ojca. Po zakończeniu Wojny o Pierścień został na koronacji Aragorna i po zwiedzeniu wraz z Gimlim jaskiń Helmowego Jaru i Fangornu odpłynął do Amanu. ')
    .setImage('https://wegotthiscovered.com/wp-content/themes/wgtc_v2/resizer/resizer.php?file=uploads/Legolas-579x360.jpg&height=746.11398963731&width=1200&action=resize')
    .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
    .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')

const GimliEmbed = new Discord.MessageEmbed()
    .setTitle('Gimli')
    .setDescription('Gimli, syn Gloina - krasnolud z Rodu Durina. Podczas gdy jego ojciec wyruszał z Thorinem by odzyskać Erebor, jemu nie pozwolono, gdyż - jako 62-latek - był za młody. Wyruszył z Drużyną Pierścienia na wyprawę do Mordoru, gdzie zaprzyjaźnił się na całe życie z Legolasem. Warto też wspomnieć, że został przyjacielem elfów, co było niesamowicie rzadkie wśród krasnoludów. Umiłował Aglarond, czyli jaskinie obok Helmowego Jaru i w 120 roku Czwartej Ery odpłynął do Amanu.')
    .setImage('https://static.wikia.nocookie.net/lotr/images/e/ec/Gimli_-_FOTR.png/revision/latest?cb=20121008105956')
    .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')
    .setThumbnail('https://cdn.discordapp.com/attachments/484655342400307211/795401844112883742/pierscien.png')

client.on('message', message => {
    if (message.content.startsWith(`${prefix}aragorn`)) {
        message.channel.send(AragornEmbed);
    }
    if (message.content.startsWith(`${prefix}legolas`)) {
        message.channel.send(LegolasEmbed);
    }
    if (message.content.startsWith(`${prefix}gimli`)) {
        message.channel.send(GimliEmbed);
    }

});

client.login(token)