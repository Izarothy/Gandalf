const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

const AragornEmbed = new Discord.MessageEmbed()
    .setTitle('Aragorn')
    .setDescription('Aragorn II, syn Arathorna II i Gilraeny, także znany jako Elessar i Obieżyświat, był szesnastym wodzem Dunedainów z Północy; później koronowany Królem Elessarem.')
    .setImage('https://www.indiewire.com/wp-content/uploads/2017/11/aragon-the-lord-of-the-rings.jpg')
    .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')

const LegolasEmbed = new Discord.MessageEmbed()
    .setTitle('Legolas')
    .setDescription('Legolas, syn Thranduila, był elfickim księciem z Mrocznej Puszczy. Wyruszył w podróż razem z Drużyną Pierścienia, żeby zniszczyć Jedyny Pierścień. Jako elf miał doskonały wzrok, tym samym znacznie przysługując się Drużynie. Zaprzyjaźnił się z Gimlim pomimo różnic, jakie dzieliły ich rasy. Nic nie wiemy o jego matce. Na spotkanie u Elronda przyszedł jako wysłannik ojca. Po zakończeniu Wojny o Pierścień został na koronacji Aragorna i po zwiedzeniu wraz z Gimlim jaskiń Helmowego Jaru i Fangornu odpłynął do Amanu. ')
    .setImage('https://wegotthiscovered.com/wp-content/themes/wgtc_v2/resizer/resizer.php?file=uploads/Legolas-579x360.jpg&height=746.11398963731&width=1200&action=resize')
    .setFooter('Tawerna Fantastyki, Sekcja Śródziemia')


client.on('message', message => {
    if (message.content.startsWith(`${prefix}aragorn`)) {
        message.channel.send(AragornEmbed);
    }
    if (message.content.startsWith(`${prefix}legolas`)) {
        message.channel.send(LegolasEmbed);
    }

});

client.login(token)