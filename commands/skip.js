const queueService = require('../services/queueService');
const musicService = require('../services/musicService');
const logger = require('../utils/logger');

module.exports = {
    name: 'skip',
    description: 'Skip the current song and play the next one in the queue',
    async execute(interaction) {
        try {
            const serverQueue = queueService.getQueue(interaction.guild.id);

            if (!serverQueue || !serverQueue.songs.length) {
                return interaction.reply('There are no songs in the queue to skip.');
            }

            // Remove the current song from the queue
            const skippedSong = serverQueue.songs.shift();
            logger.info(`Skipped: ${skippedSong.title}`);

            // Play the next song
            const nextSong = serverQueue.songs[0];
            if (nextSong) {
                await musicService.play(interaction.guild, nextSong);
                return interaction.reply(`Skipped ${skippedSong.title}. Now playing ${nextSong.title}.`);
            } else {
                return interaction.reply(`Skipped ${skippedSong.title}, but there are no more songs in the queue.`);
            }
        } catch (error) {
            logger.error(`Error processing skip command: ${error.message}`);
            await interaction.reply('An error occurred while trying to skip the song.');
        }
    },
};