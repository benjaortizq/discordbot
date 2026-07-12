const { getFlags, setFlags } = require('../utils/store.js');
const { FLAGS, tieneFlag, activarFlag, desactivarFlag } = require('../utils/flags.js');

module.exports = {
  name: 'toggle',
  execute: (message, args) => {
    const nombreFlag = args[0]?.toUpperCase(); // ej: "autosnipe" -> "AUTOSNIPE"

    if (!nombreFlag) {
      message.reply(`Use: \`!toggle <flag>\`. Banderas disponibles: ${Object.keys(FLAGS).join(', ')}`);
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

    message.reply(` **${nombreFlag}** ahora está **${yaActivo ? 'DESACTIVADO' : 'ACTIVADO'}**.`);
  },
};