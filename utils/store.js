// utils/store.js
const fs = require('fs');
const path = require('path');

const CARPETA_DATA = path.join(__dirname, '..', 'data');

// carpeta existe 
if (!fs.existsSync(CARPETA_DATA)) {
  fs.mkdirSync(CARPETA_DATA);
}

function getPathServidor(guildId) {
  return path.join(CARPETA_DATA, `${guildId}.json`);
}

function leerDatosServidor(guildId) {
  const filePath = getPathServidor(guildId);
  if (!fs.existsSync(filePath)) return {}; // si no existe, objeto vacío
  const contenido = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(contenido);
}

function guardarDatosServidor(guildId, datos) {
  const filePath = getPathServidor(guildId);
  fs.writeFileSync(filePath, JSON.stringify(datos, null, 2));
}

// Funciones específicas para el snipe
function guardarMensajeEliminado(guildId, channelId, dataMensaje) {
  const datos = leerDatosServidor(guildId);
  if (!datos.mensajesEliminados) datos.mensajesEliminados = {};
  datos.mensajesEliminados[channelId] = dataMensaje;
  guardarDatosServidor(guildId, datos);
}

function getMensajeEliminado(guildId, channelId) {
  const datos = leerDatosServidor(guildId);
  return datos.mensajesEliminados?.[channelId] ?? null;
}

function tieneFlag(configActual, flag) {
  return (configActual & flag) === flag; // AND b2b
}

function activarFlag(configActual, flag) {
  return configActual | flag; // OR b2b
}

function desactivarFlag(configActual, flag) {
  return configActual & ~flag; // i & !i 
}


module.exports = {
  guardarMensajeEliminado,
  getMensajeEliminado,
};