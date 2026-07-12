const autosnipe = require('/features/autosnipe.js'); // o donde tengas tu lógica de embed

module.exports = {
  execute: (message) => {
    try {
      autosnipe.execute(message);
    } catch (error) {
      console.error('Error en messageDelete:', error);
    }``
  },
};