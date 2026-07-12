const FLAGS = {
  WELCOME: 1 << 0,   
  LOGS:   1 << 1,
  MOD:      1 << 2,
  AUTOSNIPE: 1 << 3, 
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