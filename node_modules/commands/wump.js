// commands/wump.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wump')
    .setDescription('wumps'),
  async execute(interaction) {
    await interaction.reply('https://voxel.ip-logger.com/wump/wump.gif');
  },
};
