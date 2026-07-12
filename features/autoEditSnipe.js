const { EmbedBuilder } = require('discord.js');

module.exports = {
  execute: (oldMessage, newMessage, authorData) => {
    const embed = new EmbedBuilder()
      .setColor(authorData.color)
      .setAuthor({
        name: `${authorData.nombre} (ID: ${authorData.id})`,
        iconURL: authorData.avatar,
      })
      .setTitle('Ha editado un mensaje:')
      .addFields(
        { name: 'Antes', value: oldMessage.content || '(sin contenido)' },
        { name: 'Después', value: newMessage.content || '(sin contenido)' }
      )
      .setFooter({ text: oldMessage.guild.name, iconURL: oldMessage.guild.iconURL() })
      .setTimestamp();

    newMessage.channel.send({ embeds: [embed] })
      .catch((error) => console.error('Error al enviar editsnipe:', error));
  },
};