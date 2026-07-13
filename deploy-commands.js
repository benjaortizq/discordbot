// deploy-commands.js
require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const comandos = [];
const carpetaSlash = path.join(__dirname, 'commands', 'slash');
const archivos = fs.readdirSync(carpetaSlash).filter(f => f.endsWith('.js'));

for (const archivo of archivos) {
  const comando = require(path.join(carpetaSlash, archivo));
  comandos.push(comando.data.toJSON());
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Registrando ${comandos.length} comandos slash...`);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: comandos }
    );

    console.log('Comandos registrados correctamente.');
  } catch (error) {
    console.error(error);
  }
})();