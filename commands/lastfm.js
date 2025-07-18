const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lastfm')
    .setDescription('get someones currently playing track from last.fm')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('last.fm user')
        .setRequired(true)),

  async execute(interaction) {
    const username = interaction.options.getString('username');

    await interaction.deferReply();

    try {
      const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.recenttracks || !data.recenttracks.track || data.recenttracks.track.length === 0) {
        return interaction.editReply(`no recent tracks found for **${username}**.`);
      }

      const track = data.recenttracks.track[0];
      const isNowPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';

      if (!isNowPlaying) {
        return interaction.editReply(`**${username}** isnt listening to anything`);
      }

      const artist = track.artist['#text'] || 'Unknown Artist';
      const song = track.name || 'Unknown Song';
      const album = track.album['#text'] || 'Unknown Album';

      // Find the biggest available image (Last.fm provides multiple sizes)
      const images = track.image || [];
      const coverImage = images.length > 0 ? images[images.length - 1]['#text'] : null;

      const embed = new EmbedBuilder()
        .setTitle(`${artist} — ${song}`)
        .setDescription(`On ${album}`)
        .setColor('#1DB954')
        .setURL(track.url || null);

      if (coverImage) {
        embed.setThumbnail(coverImage);
      }

      return interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      return interaction.editReply('not listening to anything');
    }
  },
};
