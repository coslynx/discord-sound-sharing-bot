const queueService = require('../services/queueService');
const musicService = require('../services/musicService');
const logger = require('../utils/logger');

module.exports = {
    name: 'resume',
    description: 'Resume paused music playback in the voice channel',
    async execute(interaction) {
        try {
            const serverQueue = queueService.getQueue(interaction.guild.id);

            if (!serverQueue) {
                return interaction.reply('There is no music currently paused to resume.');
            }

            if (!serverQueue.playing) {
                await musicService.resume(interaction.guild);
                logger.info(`Resumed playback for guild: ${interaction.guild.id}`);
                return interaction.reply('Playback has been resumed.');
            } else {
                return interaction.reply('The music is already playing.');
            }
        } catch (error) {
            logger.error(`Error processing resume command: ${error.message}`);
            await interaction.reply('An error occurred while trying to resume the music playback.');
        }
    },
};