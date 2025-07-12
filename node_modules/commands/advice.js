const { SlashCommandBuilder } = require('discord.js');

const answers = [
  "100% yes",
  "dont speak to me ever again",
  "im wump",
  "what kind of question is that",
  "i wasnt paying attention ask again",
  "yes",
  "no",
  "even I don't know and that's saying something because i'm wump",
  "shut the fuck up.",
  "probably",
  "probably not",
  "ask again later",
  "me and my team of associates will get to you in 5-10 business days",
  "fuck off im playing freefire",
  "of course.",
  "no that's not. no just no",
  "Wump",
  "why?",
  "i like cookies",
  "LMAOOOOOOO"
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('advice')
    .setDescription('ask oh mighty wump for advice')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('go ahead')
        .setRequired(true)),
  
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const answer = answers[Math.floor(Math.random() * answers.length)];
    await interaction.reply(`**${question}** | ${answer}`);
  },
};
