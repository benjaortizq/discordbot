const { EmbedBuilder } = require('discord.js');
const { getMensajeEliminado } = require('../utils/store.js');

module.exports = {
  name: 'snipe',
  execute: (message, args) => {
    const guardado = getMensajeEliminado(message.guild.id, message.channel.id);

    if (!guardado) {
      message.reply('There is nothing to snipe.');
      return;
    }

    const timestampEnSegundos = Math.floor(guardado.fecha / 1000);

    const embed = new EmbedBuilder()
      .setColor(guardado.autor.color)
      .setAuthor({
        name: `${guardado.autor.nombre} (ID: ${guardado.autor.id})`,
        iconURL: guardado.autor.avatar,
      })
      .setDescription(guardado.contenido || '(No Content)')
      .addFields({ name: 'Eliminado', value: `<t:${timestampEnSegundos}:R>` })
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });

    message.channel.send({ embeds: [embed] });
  },
};