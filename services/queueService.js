const { Queue } = require('discord.js');
const logger = require('../utils/logger');

class MusicQueue {
    constructor(guildId) {
        this.guildId = guildId;
        this.songs = [];
        this.playing = false;
        this.volume = 5; // Default volume level
        this.voiceChannel = null;
    }
}

const queues = new Map();

// Create a new queue for the guild
function createQueue(guildId) {
    const queue = new MusicQueue(guildId);
    queues.set(guildId, queue);
    return queue;
}

// Retrieve the queue for a specific guild
function getQueue(guildId) {
    return queues.get(guildId);
}

// Add a song to the queue
async function addToQueue(guildId, song) {
    const serverQueue = getQueue(guildId);
    if (!serverQueue) {
        logger.error(`Queue does not exist for guild: ${guildId}`);
        throw new Error('No queue found.');
    }
    serverQueue.songs.push(song);
}

// Remove a song from the queue
function removeFromQueue(guildId, song) {
    const serverQueue = getQueue(guildId);
    if (!serverQueue) {
        logger.error(`Queue does not exist for guild: ${guildId}`);
        throw new Error('No queue found.');
    }

    const index = serverQueue.songs.indexOf(song);
    if (index > -1) {
        serverQueue.songs.splice(index, 1);
        logger.info(`Removed song: ${song.title} from queue for guild: ${guildId}`);
    }
}

// Clear the queue
function clearQueue(guildId) {
    const serverQueue = getQueue(guildId);
    if (serverQueue) {
        serverQueue.songs = [];
        logger.info(`Cleared the queue for guild: ${guildId}`);
    }
}

// Set the currently playing status
function setPlaying(guildId, isPlaying) {
    const serverQueue = getQueue(guildId);
    if (serverQueue) {
        serverQueue.playing = isPlaying;
    }
}

// Get the next song to play
function getNextSong(guildId) {
    const serverQueue = getQueue(guildId);
    if (serverQueue && serverQueue.songs.length > 0) {
        return serverQueue.songs[0];
    }
    return null;
}

// Get current volume
function getVolume(guildId) {
    const serverQueue = getQueue(guildId);
    return serverQueue ? serverQueue.volume : 5;
}

// Set the volume
function setVolume(guildId, volume) {
    const serverQueue = getQueue(guildId);
    if (serverQueue) {
        serverQueue.volume = volume;
        logger.info(`Set volume to ${volume} for guild: ${guildId}`);
    }
}

// Disconnect the bot from the voice channel and clear the queue
function disconnectGuild(guildId) {
    clearQueue(guildId);
    queues.delete(guildId);
    logger.info(`Disconnected bot and cleared queue for guild: ${guildId}`);
}

// Exporting functions
module.exports = {
    createQueue,
    getQueue,
    addToQueue,
    removeFromQueue,
    clearQueue,
    setPlaying,
    getNextSong,
    getVolume,
    setVolume,
    disconnectGuild
};