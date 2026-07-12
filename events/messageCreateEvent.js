
const { PREFIX } = require('../config.js');


module.exports = {

  
  execute: (message, comandos) => {

    if (message.author.bot) return;


    if (!message.content.startsWith(PREFIX))  { 
    };

    if (message.content.includes ("me gusta")) { 
      message.channel.send ('A mi tambien!');
    }
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const comando = comandos.get(commandName);
    if (!comando) return; 

    comando.execute(message, args);


  },
};