module.exports = {
  name: 'help',
  execute(message, args) {
    const helpMessage = `
        **Comandos disponibles:**
        - **!ping**: Responde con "Pong."
        - **!snipe**: Muestra el último mensaje eliminado en el canal.
        - **!toggle <flag>**: Activa o desactiva una bandera específica.
        - **!toggle list**: Muestra el estado de todas las banderas.
        - **!help**: Muestra este mensaje de ayuda.

        **Flags disponibles:**
        - **AUTOSNIPE**: Activa el snipe automático de mensajes eliminados.
        - **AUTOEDITSNIPE**: Activa el auto-snipe de mensajes editados.
        - **WELCOME**: Activa el mensaje de bienvenida.
        - **LOGS**: Activa el registro de eventos en el canal de logs.
        - **MODERACION**: Activa funciones de moderación.

        Para más información sobre cada comando, usá \`!help <comando>\`.
    `;

    message.reply(helpMessage);
  },
};
