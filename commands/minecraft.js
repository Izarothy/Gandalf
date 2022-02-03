const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { minecraft } = require('../json/messages.json');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('minecraft')
    .setDescription('Sends back a Minecraft server embed'),
  async execute(interaction) {
    const minecraftEmbed = new MessageEmbed()
      .setTitle(minecraft.title)
      .setDescription(minecraft.description)
      .setColor(minecraft.color)
      .setThumbnail(minecraft.thumbnail);
    await interaction.reply({ embeds: [minecraftEmbed] });
  },
};
