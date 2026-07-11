require('dotenv').config();
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');

const PREFIX = '!'; // prefijo del bot por deafault 

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});


//esto es solo para dar a entender que se creo un bot asi como asi xd . 
client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

// si se crea un mensaje con 


client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('Pong.');
  } else if (command === 'beep') {
    message.channel.send('Boop.');
  }
});


//si se elimina un mensaje :
client.on ("messageDelete", (message) => {
    try {
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
            .setDescription(message.content) 
            .setFooter({ text: message.guild.name , iconURL: message.guild.iconURL() })
            ;

        message.channel.send({ embeds: [embed] });




            
    } catch (error) {
            console.error(':', error);
            message.channel.send ('Error :' + error.message);

    }
});


client.login(process.env.DISCORD_TOKEN);