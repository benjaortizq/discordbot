
const { FLAGS, tieneFlag, activarFlag, desactivarFlag } = require('../utils/flags.js');
const { getFlags, setFlags } = require('../utils/store.js');

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
      const flagsActuales = getFlags(message.guild.id);

      if ( tieneFlag(flagsActuales, FLAGS.AUTOSNIPE) ) {
        autosnipe.execute(message, authorData);
      }


      const primerAdjunto = message.attachments.first(); // revisa los archivos del coso . 
      //se grea el archivo de mensjae eliminado por canal 
      guardarMensajeEliminado(message.guild.id, message.channel.id, {
        contenido: message.content || '(sin contenido de texto)',
        autor: authorData,
        imagenUrl: primerAdjunto ? primerAdjunto.url : null,
        fecha: message.createdTimestamp,
        });
        
    } catch (error) {
      console.error('Error en messageDelete:', error);
    }``
  },
};