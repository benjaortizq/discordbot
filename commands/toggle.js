const { getFlags, setFlags } = require('../utils/store.js');
const { FLAGS, tieneFlag, activarFlag, desactivarFlag } = require('../utils/flags.js');

module.exports = {
  name: 'toggle',
  execute: (message, args) => {
    const nombreFlag = args[0]?.toUpperCase();

    if (!nombreFlag) {
      message.reply(`Use: \`!toggle <flag>\` o \`!toggle list\`. Banderas disponibles: ${Object.keys(FLAGS).join(', ')}`);
      return;
    }

    // Caso especial: mostrar las flags activas
    if (nombreFlag === 'LIST') {
      const flagsActuales = getFlags(message.guild.id);

      const listaEstado = Object.keys(FLAGS)
        .map(nombre => {
          const activa = tieneFlag(flagsActuales, FLAGS[nombre]);
          return `${activa ? '✅' : '❌'} ${nombre}`;
        })
        .join('\n');

      message.reply(`**Estado de las banderas:**\n${listaEstado}`);
      return;
    }

    if (!(nombreFlag in FLAGS)) {
      message.reply(`Esa bandera no existe. Banderas disponibles: ${Object.keys(FLAGS).join(', ')}`);
      return;
    }

    const flag = FLAGS[nombreFlag];
    const flagsActuales = getFlags(message.guild.id);
    const yaActivo = tieneFlag(flagsActuales, flag);

    const nuevoValor = yaActivo
      ? desactivarFlag(flagsActuales, flag)
      : activarFlag(flagsActuales, flag);

    setFlags(message.guild.id, nuevoValor);

    message.reply(`**${nombreFlag}** ahora está **${yaActivo ? 'DESACTIVADO' : 'ACTIVADO'}**.`);
  },
};