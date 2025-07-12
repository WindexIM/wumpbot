const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('random number between 1 and 100'),
  
  async execute(interaction) {
    const roll = Math.floor(Math.random() * 100) + 1;
    await interaction.reply(` **${roll}**`);
  },
};
