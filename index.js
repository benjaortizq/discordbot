require('dotenv').config();
const { Client, GatewayIntentBits, Partials, EmbedBuilder,ActivityType } = require('discord.js');

const PREFIX = '!'; // prefijo del bot por deafault 
const ping = require('./commands/ping.js'); // ← ACÁ arriba, junto a los demás imports
const snipe = require('./events/snipe.js'); // ← ACÁ arriba, junto a los demás imports

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
    activities: [{ name: 'Type !help ', type: ActivityType.Listening }],
    status: 'online',
    });
});

// si se crea un mensaje con 


client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX))  { 

    };

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        ping.execute(message, args);
    }



});


//si se elimina un mensaje :
client.on ("messageDelete", (message) => {
    try {
        snipe.execute(message);
 
    } catch (error) {
            console.error(':', error);

    }
});


client.login(process.env.DISCORD_TOKEN);