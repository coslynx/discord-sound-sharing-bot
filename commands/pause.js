const queueService = require('../services/queueService');
const musicService = require('../services/musicService');
const logger = require('../utils/logger');

module.exports = {
    name: 'pause',
    description: 'Pause the currently playing music in the voice channel',
    async execute(interaction) {
        try {
            const serverQueue = queueService.getQueue(interaction.guild.id);

            if (!serverQueue) {
                return interaction.reply('There is no music playing to pause.');
            }

            if (serverQueue.playing) {
                await musicService.pause(interaction.guild);
                logger.info(`Paused playback for guild: ${interaction.guild.id}`);
                return interaction.reply('Playback has been paused.');
            } else {
                return interaction.reply('The music is already paused.');
            }
        } catch (error) {
            logger.error(`Error processing pause command: ${error.message}`);
            await interaction.reply('An error occurred while trying to pause the music playback.');
        }
    },
};