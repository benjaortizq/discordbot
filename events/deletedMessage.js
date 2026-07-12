const { EmbedBuilder } = require('discord.js');

module.exports = {  
    execute: (message, args) => {
        if (message.author.bot) return;
        
        const authorData = {
            id: message.author.id,
            nombre: message.author.tag,
            avatar: message.author.displayAvatarURL(),
            color: message.member.displayHexColor,
};



        const embed = new EmbedBuilder()
            .setColor(authorData.color)
            .setAuthor({
                name: authorData.nombre + ' (' + "ID :" + authorData.id + ')',
                iconURL: authorData.avatar,
            })
            .setTitle('Ha eliminado un mensaje :')
            .setDescription(message.content|| '(No Content)') 
            .setFooter({ text: message.guild.name , iconURL: message.guild.iconURL() })
            ;

        message.channel.send({ embeds: [embed] });

} }