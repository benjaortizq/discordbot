module.exports = {
  execute: (message) => {

    if (message.author.bot) return;


    if (!message.content.startsWith(PREFIX))  {  // COSAS QUE DEBERIAN IR SI ES QUE SE TIENE UN PREFIJO.
    //SI LA VARIABLE SENDPREXIVMESSAGES ESTA ACTIVA ENTONCES SE CORER EL AMAJER DE EVENTS . 

    };
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        ping.execute(message, args);
    }


  },
};