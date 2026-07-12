require('dotenv').config();

module.exports = {
  PREFIX: process.env.PREFIX || '!', // si no está en .env, usa '!' por defecto
  LOG_CHANNEL_ID: process.env.LOG_CHANNEL_ID,
};