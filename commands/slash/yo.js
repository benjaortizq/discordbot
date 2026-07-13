const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yo')
    .setDescription('Muestra tus datos en un embed')
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription('Contenido a mostrar')
        .setRequired(false)
    ),

  execute: async (interaction) => {
    const contenido = interaction.options.getString('mensaje') || '(sin contenido)';

    const embed = new EmbedBuilder()
      .setColor(interaction.member?.displayHexColor ?? '#000000')
      .setAuthor({ name: interaction.user.tag + " ID : (" + interaction.user.id + ")", iconURL: interaction.user.displayAvatarURL() })
      .setTitle ( 'Dice que :')
      .setDescription(contenido)
      .setFooter ({text : interaction.guild.name, iconURL: interaction.guild.iconURL()})
      .setTimestamp () ;

    await interaction.reply({ embeds: [embed] });
  },
};