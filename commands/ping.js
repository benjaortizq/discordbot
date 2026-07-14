const { FLAGS, tieneFlag, activarFlag, desactivarFlag } = require('../utils/flags.js');

module.exports = {

  
  name: 'ping',
  
  execute(message, args) {

    const flagsActuales = getFlags(message.guild.id);
    
    if (tieneFlag(flagsActuales, FLAGS.PING)) {
      return;
    }
    

    
    message.channel.send('Pong.');
  },
};