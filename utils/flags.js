const FLAGS = {
  PCOMMANDS: 1 << 0,   // PERMITE USAR COMANDOS DEL BOT (PREFIX)
  LOGS:   1 << 1,
  MOD:      1 << 2,
  AUTOSNIPE: 1 << 3, 
  AUTOEDITSNIPE: 1 << 4 //NO SE COMO LLAMARLO . flag que si alguien edita un mensaje , se manda el mensaje original a donde se EDITO 

};

function tieneFlag(configActual, flag) {
  return (configActual & flag) === flag; // AND
}

function activarFlag(configActual, flag) {
  return configActual | flag; // OR 
}

function desactivarFlag(configActual, flag) {
  return configActual & ~flag; // i & !i 
}

module.exports = {FLAGS, tieneFlag, activarFlag, desactivarFlag}