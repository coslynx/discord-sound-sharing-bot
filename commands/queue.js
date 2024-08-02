const { Queue } = require('discord.js');
const queueService = require('../services/queueService');
const musicService = require('../services/musicService');
const logger = require('../utils/logger');

module.exports = {
    name: 'queue',
    description: 'Manage the music queue',
    async execute(interaction) {
        try {
            const serverQueue = queueService.getQueue(interaction.guild.id);

            if (!serverQueue) {
                return interaction.reply('There is no music playing in the queue.');
            }
            
            const queueInfo = serverQueue.songs.map((song, index) => {
                return `${index + 1}. ${song.title} - Requested by: ${song.requestedBy}`;
            }).join('\n');

            await interaction.reply(`Current Queue:\n${queueInfo}`);
        } catch (error) {
            logger.error(`Error processing queue command: ${error.message}`);
            await interaction.reply('An error occurred while trying to get the queue.');
        }
    },
};