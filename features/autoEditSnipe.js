const { EmbedBuilder } = require('discord.js');
function limpiarId(texto) {
  return texto.replace(/[<@!>]/g, ''); // quita <, @, !, > — deja solo los números
}

module.exports = {
  execute: (oldMessage, newMessage, authorData) => {
    const embed = new EmbedBuilder()
      .setColor(authorData.color)
      .setAuthor({
        name: `${authorData.nombre} (ID: ${limpiarId(authorData.id)})`,
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
      .catch((error) => console.error('Error @autoEditSnipe:', error));
  },
};