const autosnipe = require('../features/autoSnipe.js'); // o donde tengas tu lógica de embed
const mensajesEliminados = require('../utils/store.js'); // o donde tengas tu lógica de almacenamiento
module.exports = {
  execute: (message) => {
    try { 
      if (message.author.bot) return;

      const authorData = {
        id: message.author.id,
        nombre: message.author.tag,
        avatar: message.author.displayAvatarURL(),
        color: message.member?.displayHexColor ?? '#000000',
    };
      //se ejecuta autosnipe para enviar el embed del mensaje eliminado
      autosnipe.execute(message, authorData);

      //se grea el archivo de mensjae eliminado por canal 
      mensajesEliminados.set(message.channel.id, {
        contenido: message.content || '(sin contenido de texto)',
        autor: authorData,
        fecha: message.createdTimestamp,
        });
        
    } catch (error) {
      console.error('Error en messageDelete:', error);
    }``
  },
};