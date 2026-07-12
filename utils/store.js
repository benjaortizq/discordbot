// utils/store.js
const fs = require('fs');
const path = require('path');
const { FLAGS, tieneFlag, activarFlag, desactivarFlag } = require('./flags.js');

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
  if (!fs.existsSync(filePath)) return {}; // si no existe, objeto vacio
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


//*IDS AUTOEDITSNIPE ----------------------------------------------------------------


function getIdsPermitidos(guildId) {
  const datos = leerDatosServidor(guildId);
  return datos.idsPermitidosEditSnipe ?? [];
}

function agregarIdPermitido(guildId, userId) {
  const datos = leerDatosServidor(guildId);
  if (!datos.idsPermitidosEditSnipe) datos.idsPermitidosEditSnipe = [];
  if (!datos.idsPermitidosEditSnipe.includes(userId)) {
    datos.idsPermitidosEditSnipe.push(userId);
  }
  guardarDatosServidor(guildId, datos);
}

function quitarIdPermitido(guildId, userId) {
  const datos = leerDatosServidor(guildId);
  if (!datos.idsPermitidosEditSnipe) return;
  datos.idsPermitidosEditSnipe = datos.idsPermitidosEditSnipe.filter(id => id !== userId);
  guardarDatosServidor(guildId, datos);
}




//*FLAGS ----------------------------------------------------------------


function getFlags(guildId) {
  const datos = leerDatosServidor(guildId);
  return datos.flags ?? 0;
}

function setFlags(guildId, flags) {
  const datos = leerDatosServidor(guildId);
  datos.flags = flags;
  guardarDatosServidor(guildId, datos);
}



module.exports = {
  guardarMensajeEliminado,
  getMensajeEliminado,

  getIdsPermitidos,
  agregarIdPermitido,
  quitarIdPermitido,


  getFlags,
  setFlags ,
  
};