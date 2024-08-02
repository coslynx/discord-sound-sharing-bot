const queueService = require('../services/queueService');
const musicService = require('../services/musicService');
const logger = require('../utils/logger');

module.exports = {
    name: 'play',
    description: 'Play a requested song in the voice channel',
    async execute(interaction) {
        try {
            const songUrl = interaction.options.getString('url');
            const voiceChannel = interaction.member.voice.channel;

            if (!voiceChannel) {
                return interaction.reply('You need to be in a voice channel to play music!');
            }

            const serverQueue = queueService.getQueue(interaction.guild.id);

            // Check if the user is trying to play a song while there is no queue
            if (!serverQueue) {
                const queueConstruct = queueService.createQueue(interaction.guild.id);
                queueConstruct.voiceChannel = voiceChannel;

                await musicService.play(interaction.guild, songUrl);
                return interaction.reply(`Now playing: ${songUrl}`);
            }

            // If the queue already exists
            await musicService.addToQueue(interaction.guild, songUrl);
            logger.info(`Added to queue for guild: ${interaction.guild.id}. Song: ${songUrl}`);
            return interaction.reply(`Added to queue: ${songUrl}`);
        } catch (error) {
            logger.error(`Error processing play command: ${error.message}`);
            await interaction.reply('An error occurred while trying to play the song. Please check the URL and try again.');
        }
    },
};