// events/interactionCreate.js
module.exports = {
  execute: async (interaction, comandosSlash) => {
    if (!interaction.isChatInputCommand()) return; // solo slash cmd

    const comando = comandosSlash.get(interaction.commandName);
    if (!comando) return;

    try {
      await comando.execute(interaction);
    } catch (error) {
      console.error('Error ejecutando slash command:', error);
      await interaction.reply({ content: 'Hubo un error ejecutando el comando.', ephemeral: true });
    }
  },
};