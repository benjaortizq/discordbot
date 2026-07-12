const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

function cargarComandos() {
  const comandos = new Collection();
  const carpetaComandos = path.join(__dirname, '..', 'commands');
  const archivos = fs.readdirSync(carpetaComandos).filter(f => f.endsWith('.js'));

  for (const archivo of archivos) {
    const comando = require(path.join(carpetaComandos, archivo));
    comandos.set(comando.name, comando);
  }

  return comandos;
}

module.exports = { cargarComandos };