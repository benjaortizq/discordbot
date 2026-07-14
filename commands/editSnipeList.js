// commands/editsnipelist.js
const { agregarIdPermitido, quitarIdPermitido, getIdsPermitidos } = require('../utils/store.js');

function limpiarId(texto) {
  return texto.replace(/[<@!>]/g, ''); // quita <, @, !, > — deja solo los números
}


module.exports = {
  name: 'editsnipelist',
  execute: (message, args) => {
    if (!message.member.permissions.has('ManageGuild')) {
      message.reply('No tenés permiso para usar este comando. Necesitás los sigueintes permisos :  `MANAGEGUILD`.');
      return;
    }

    const accion = args[0]; // 'add', 'remove', 'list'
    const UsuarioMention = args[1];

    const userId = UsuarioMention ? limpiarId(UsuarioMention) : null;

    if (accion === 'add' && userId) {
      agregarIdPermitido(message.guild.id, userId);
      message.reply(` **${UsuarioMention}** agregado a la lista de edit-snipe.`);
    } else if (accion === 'remove' && userId) {

      quitarIdPermitido(message.guild.id, userId);
      message.reply(`**${UsuarioMention}** quitado de la lista.`);
    } else if (accion === 'list') {
        const ids = getIdsPermitidos(message.guild.id);
        const listaFormateada = ids.map(id => `<@${id}>`).join(', ');
        message.reply(ids.length ? `Usuarios en la lista  de Edit-Snipe: ${listaFormateada}` : 'No hay IDs en la lista.');
    } else {
      message.reply('Use: `!editsnipelist add (Usuario)`, `!editsnipelist remove (Usuario)`, o `!editsnipelist list`');
    }
  },
};