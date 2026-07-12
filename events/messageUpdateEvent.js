const { getFlags, getIdsPermitidos } = require('../utils/store.js');
const { FLAGS, tieneFlag } = require('../utils/flags.js');
const editsnipe = require('../features/autoEditSnipe.js');


module.exports = { 
    
    execute: (oldMessage, newMessage)=> {
        try {
            if (oldMessage.partial || !oldMessage.author) return; // no cache
            if (oldMessage.author.bot) return;
            if (oldMessage.content === newMessage.content) return; // embed/reaction

            const flagsActuales = getFlags(oldMessage.guild.id);
            if (!tieneFlag(flagsActuales, FLAGS.AUTOEDITSNIPE)) return; //not active 

            const idsPermitidos = getIdsPermitidos(oldMessage.guild.id);
            if (idsPermitidos.includes(oldMessage.author.id)) { // allowed list 
            const authorData = {
                id: oldMessage.author.id,
                nombre: oldMessage.author.tag,
                avatar: oldMessage.author.displayAvatarURL(),
                color: oldMessage.member?.displayHexColor ?? '#000000',
            };

            editsnipe.execute(oldMessage, newMessage, authorData);

            } 


        } catch (error) {
            console.error('Error @messageUpdateEvent.js:', error);
    }
  },

        
}