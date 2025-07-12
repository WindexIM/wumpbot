const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch'); // npm install node-fetch@2
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('sends a random picture of a cat'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': process.env.CAT_API_KEY,
        },
      });
      const data = await response.json();

      if (!data[0] || !data[0].url) {
        return interaction.editReply('couldnt get a cat picture');
      }

      const embed = new EmbedBuilder()
        .setTitle('this is a cat')
        .setImage(data[0].url)
        .setColor('#FFC0CB');

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.editReply('couldnt get a cat picture');
    }
  },
};
