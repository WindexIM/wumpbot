const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('deadass what do you think it does'),
  async execute(interaction) {
    const latency = Date.now() - interaction.createdTimestamp;

    await interaction.reply(`${latency}ms`);
  },
};
