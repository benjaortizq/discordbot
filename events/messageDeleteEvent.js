const autosnipe = require('../features/autoSnipe.js');
const { guardarMensajeEliminado } = require('../utils/store.js');
module.exports = {
  execute: (message) => {
    try { 
      if (message.author.bot) return;

      const authorData = {
        id: message.author.id,
        nombre: message.author.tag,
        avatar: message.author.displayAvatarURL(),
        color: message.member.displayHexColor,
    };
      //se ejecuta autosnipe para enviar el embed del mensaje eliminado
      autosnipe.execute(message, authorData);

      //se grea el archivo de mensjae eliminado por canal 
      guardarMensajeEliminado(message.guild.id, message.channel.id, {
        contenido: message.content || '(sin contenido de texto)',
        autor: authorData,
        fecha: message.createdTimestamp,
        });
        
    } catch (error) {
      console.error('Error en messageDelete:', error);
    }``
  },
};