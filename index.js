require('dotenv').config();
const { Client, GatewayIntentBits, Partials, EmbedBuilder,ActivityType } = require('discord.js');


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

client.user.setPresence({
    activities: [{ name: 'Que rico que esta raizer', type: ActivityType.Listening }],
    status: 'online',
    });
});

// si se crea un mensaje con 


client.on('messageCreate', (message) => {


});


//si se elimina un mensaje :



client.login(process.env.DISCORD_TOKEN);