const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde con Pong'),

  execute: async (interaction) => {
    await interaction.reply('Pong.');
  },
};