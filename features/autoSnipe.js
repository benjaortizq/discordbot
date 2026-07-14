const { EmbedBuilder } = require('discord.js');
const mensajesEliminados = require('../utils/store.js');

const { FLAGS, tieneFlag, activarFlag, desactivarFlag } = require('../utils/flags.js');

module.exports = {  
    execute: (message, authorData) => {

        const flagsActuales = getFlags(message.guild.id);
        if (!tieneFlag(flagsActuales, FLAGS.AUTOEDITSNIPE)) return; //not active
        
        const embed = new EmbedBuilder()
            .setColor(authorData.color)
            .setAuthor({
                name: authorData.nombre + ' (' + "ID :" + authorData.id + ')',
                iconURL: authorData.avatar,
            })
            .setTitle('Ha eliminado un mensaje :')
            .setDescription(message.content|| '_ _') 
            .setImage(message.attachments.first() ? message.attachments.first().url : null)
            .setFooter({ text: message.guild.name , iconURL: message.guild.iconURL() })
            .setTimestamp(message.createdAt)
            ;

        message.channel.send({ embeds: [embed] });

} 
}