// commands/editsnipelist.js
const { agregarIdPermitido, quitarIdPermitido, getIdsPermitidos } = require('../utils/store.js');

function limpiarId(texto) {
  return texto.replace(/[<@!>]/g, ''); // quita <, @, !, > — deja solo los números
}


module.exports = {
  name: 'editsnipelist',
  execute: (message, args) => {
    const accion = args[0]; // 'add', 'remove', 'list'
    const userIdAt = args[1];

    const userId = userIdAt ? limpiarId(userIdAt) : null;

    if (accion === 'add' && userId) {
      agregarIdPermitido(message.guild.id, userId);
      message.reply(` ID **${userIdAt}** agregado a la lista de edit-snipe.`);
    } else if (accion === 'remove' && userId) {

      quitarIdPermitido(message.guild.id, userId);
      message.reply(`**${userIdAt}** quitado de la lista.`);
    } else if (accion === 'list') {
      const ids = getIdsPermitidos(message.guild.id);
      message.reply(ids.length ? `IDs permitidos: ${ids.join(', ')}` : 'No hay IDs en la lista.');
    } else {
      message.reply('Use: `!editsnipelist add <id>`, `!editsnipelist remove <id>`, o `!editsnipelist list`');
    }
  },
};