const queueService = require('../services/queueService');
const logger = require('./logger');

function setVolume(guildId, volume) {
    const serverQueue = queueService.getQueue(guildId);
    if (serverQueue) {
        serverQueue.volume = volume;
        logger.info(`Volume set to ${volume} for guild: ${guildId}`);
    } else {
        logger.error(`Unable to set volume. No queue found for guild: ${guildId}`);
        throw new Error(`Unable to set volume. No queue found for guild: ${guildId}`);
    }
}

function getVolume(guildId) {
    const serverQueue = queueService.getQueue(guildId);
    return serverQueue ? serverQueue.volume : 5; // Return default volume if no queue exists
}

function mute(guildId) {
    const serverQueue = queueService.getQueue(guildId);
    if (serverQueue) {
        serverQueue.volume = 0; // Set volume to 0 for mute
        logger.info(`Muted volume for guild: ${guildId}`);
    } else {
        logger.error(`Unable to mute. No queue found for guild: ${guildId}`);
        throw new Error(`Unable to mute. No queue found for guild: ${guildId}`);
    }
}

function unmute(guildId, originalVolume) {
    const serverQueue = queueService.getQueue(guildId);
    if (serverQueue) {
        serverQueue.volume = originalVolume; // Restore to original volume
        logger.info(`Unmuted volume for guild: ${guildId}`);
    } else {
        logger.error(`Unable to unmute. No queue found for guild: ${guildId}`);
        throw new Error(`Unable to unmute. No queue found for guild: ${guildId}`);
    }
}

module.exports = {
    setVolume,
    getVolume,
    mute,
    unmute,
};