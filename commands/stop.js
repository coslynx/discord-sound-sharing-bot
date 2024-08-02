const queueService = require('../services/queueService');
const musicService = require('../services/musicService');
const logger = require('../utils/logger');

module.exports = {
    name: 'stop',
    description: 'Stop the current playback and disconnect the bot from the voice channel',
    async execute(interaction) {
        try {
            const serverQueue = queueService.getQueue(interaction.guild.id);

            if (!serverQueue) {
                return interaction.reply('There is no music playing to stop.');
            }

            // Stop the currently playing music
            await musicService.stop(interaction.guild);

            // Clear the queue
            queueService.clearQueue(interaction.guild.id);
            logger.info(`Playback stopped and queue cleared for guild: ${interaction.guild.id}`);

            await interaction.reply('Playback stopped and the queue has been cleared.');
        } catch (error) {
            logger.error(`Error processing stop command: ${error.message}`);
            await interaction.reply('An error occurred while trying to stop the music.');
        }
    },
};