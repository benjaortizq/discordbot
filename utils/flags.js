const FLAGS = {
  WELCOME: 1 << 0,   
  LOGS:   1 << 1,
  MOD:      1 << 2,
  AUTOSNIPE: 1 << 3, 
  TRACKEDIT: 1 << 4 //NO SE COMO LLAMARLO . flag que si alguien edita un mensaje , se manda el mensaje original a donde se EDITO 

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