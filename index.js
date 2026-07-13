require('dotenv').config();
const { Client, GatewayIntentBits, Partials, EmbedBuilder,ActivityType } = require('discord.js');
const { Collection } = require('discord.js');

const fs = require('fs');
const path = require('path');


const { cargarComandos } = require('./handlers/commandHandler.js');
const comandos = cargarComandos(); // se carga una sola vez al arrancar

const messageCreate = require('./events/messageCreateEvent.js');
const messageDelete = require('./events/messageDeleteEvent.js');
const messageUpdate = require('./events/messageUpdateEvent.js');
const interactionCreateEvent = require('./events/interactionCreateEvent.js');


const comandosSlash = new Collection();
const carpetaSlash = path.join(__dirname, 'commands', 'slash');


const { PREFIX } = require('./config.js');

fs.readdirSync(carpetaSlash).filter(f => f.endsWith('.js')).forEach(archivo => {
  const comando = require(path.join(carpetaSlash, archivo));
  comandosSlash.set(comando.data.name, comando);
});



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
console.log(`Bot conectado Existosamente `);

client.user.setPresence({
    activities: [{ name: '/Ban @Mr Bodrio', type: ActivityType.Listening }],
    status: 'online',
    });
});




//EVENTOS Y  COMANDOS DEL BOT -0-0-0-0-0-0-0-0-0-0-0--0-0--0-0-0-0-0-0-0-0-0-0-0-0-0--0-0-0-0-0

client.on('messageCreate', (message) => {
    messageCreate.execute(message, comandos);
});

client.on('messageDelete', (message) => {
    messageDelete.execute(message);
});


client.on ('messageUpdate', (oldMessage, newMessage) => {
    messageUpdate.execute(oldMessage, newMessage); 
}) 


client.on('interactionCreate', (interaction) => {
  interactionCreateEvent.execute(interaction, comandosSlash);
});

client.login(process.env.DISCORD_TOKEN);