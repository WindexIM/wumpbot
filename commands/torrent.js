const { SlashCommandBuilder } = require('discord.js');
const parseTorrent = require('parse-torrent');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('torrent')
    .setDescription('gives info about a magnet link')
    .addStringOption(option =>
      option.setName('magnet')
        .setDescription('magnet link to parse')
        .setRequired(true)
    ),

  async execute(interaction) {
    const magnet = interaction.options.getString('magnet');

    await interaction.deferReply();

    try {
      const parsed = parseTorrent(magnet);

      const name = parsed.name || 'Unknown (metadata not embedded)';
      const infoHash = parsed.infoHash;
      const trackers = parsed.announce?.length ? parsed.announce.join('\n') : 'None';
      const message = `Torrent info:
**Name:** ${name}
**Info Hash:** ${infoHash}
**Trackers:**
\`\`\`
${trackers}
\`\`\``;

      interaction.editReply(message);
    } catch (err) {
      console.error(err);
      interaction.editReply('failed to parse magnet link. make sure it actually, yknow exists');
    }
  }
};
