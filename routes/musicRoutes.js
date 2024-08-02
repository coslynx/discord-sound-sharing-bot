const express = require('express');
const router = express.Router();
const queueService = require('../services/queueService');
const musicService = require('../services/musicService');
const logger = require('../utils/logger');
const { handleError } = require('../utils/errorHandler');

// Play a song from a URL
router.post('/play', async (req, res) => {
    const { guildId, songUrl } = req.body;

    try {
        const voiceChannel = req.body.voiceChannel; 
        
        if (!voiceChannel) {
            return res.status(400).json({ message: 'You need to be in a voice channel to play music!' });
        }

        const serverQueue = queueService.getQueue(guildId);

        if (!serverQueue) {
            const queueConstruct = queueService.createQueue(guildId);
            queueConstruct.voiceChannel = voiceChannel;

            await musicService.play({ id: guildId }, songUrl);
            return res.status(200).json({ message: `Now playing: ${songUrl}` });
        }

        await musicService.addToQueue(guildId, songUrl);
        logger.info(`Added to queue for guild: ${guildId}. Song: ${songUrl}`);
        return res.status(200).json({ message: `Added to queue: ${songUrl}` });
    } catch (error) {
        logger.error(`Error processing play command: ${error.message}`);
        handleError(error, res);
    }
});

// Pause the currently playing music
router.post('/pause', async (req, res) => {
    const { guildId } = req.body;

    try {
        const serverQueue = queueService.getQueue(guildId);

        if (!serverQueue) {
            return res.status(400).json({ message: 'There is no music playing to pause.' });
        }

        if (serverQueue.playing) {
            await musicService.pause({ id: guildId });
            logger.info(`Paused playback for guild: ${guildId}`);
            return res.status(200).json({ message: 'Playback has been paused.' });
        } else {
            return res.status(200).json({ message: 'The music is already paused.' });
        }
    } catch (error) {
        logger.error(`Error processing pause command: ${error.message}`);
        handleError(error, res);
    }
});

// Resume the paused music playback
router.post('/resume', async (req, res) => {
    const { guildId } = req.body;

    try {
        const serverQueue = queueService.getQueue(guildId);

        if (!serverQueue) {
            return res.status(400).json({ message: 'There is no music currently paused to resume.' });
        }

        if (!serverQueue.playing) {
            await musicService.resume({ id: guildId });
            logger.info(`Resumed playback for guild: ${guildId}`);
            return res.status(200).json({ message: 'Playback has been resumed.' });
        } else {
            return res.status(200).json({ message: 'The music is already playing.' });
        }
    } catch (error) {
        logger.error(`Error processing resume command: ${error.message}`);
        handleError(error, res);
    }
});

// Stop the current playback and clear the queue
router.post('/stop', async (req, res) => {
    const { guildId } = req.body;

    try {
        const serverQueue = queueService.getQueue(guildId);

        if (!serverQueue) {
            return res.status(400).json({ message: 'There is no music playing to stop.' });
        }

        await musicService.stop({ id: guildId });
        queueService.clearQueue(guildId);
        logger.info(`Playback stopped and queue cleared for guild: ${guildId}`);

        return res.status(200).json({ message: 'Playback stopped and the queue has been cleared.' });
    } catch (error) {
        logger.error(`Error processing stop command: ${error.message}`);
        handleError(error, res);
    }
});

// Skip the current song and play the next one in the queue
router.post('/skip', async (req, res) => {
    const { guildId } = req.body;

    try {
        const serverQueue = queueService.getQueue(guildId);

        if (!serverQueue || !serverQueue.songs.length) {
            return res.status(400).json({ message: 'There are no songs in the queue to skip.' });
        }

        const skippedSong = serverQueue.songs.shift();
        logger.info(`Skipped: ${skippedSong.title}`);

        const nextSong = serverQueue.songs[0];
        if (nextSong) {
            await musicService.play({ id: guildId }, nextSong.url);
            return res.status(200).json({ message: `Skipped ${skippedSong.title}. Now playing ${nextSong.title}.` });
        } else {
            return res.status(200).json({ message: `Skipped ${skippedSong.title}, but there are no more songs in the queue.` });
        }
    } catch (error) {
        logger.error(`Error processing skip command: ${error.message}`);
        handleError(error, res);
    }
});

// Get the current music queue
router.get('/queue', async (req, res) => {
    const { guildId } = req.query;

    try {
        const serverQueue = queueService.getQueue(guildId);

        if (!serverQueue) {
            return res.status(400).json({ message: 'There is no music playing in the queue.' });
        }

        const queueInfo = serverQueue.songs.map((song, index) => {
            return `${index + 1}. ${song.title} - Requested by: ${song.requestedBy}`;
        }).join('\n');

        return res.status(200).json({ queue: queueInfo });
    } catch (error) {
        logger.error(`Error processing queue command: ${error.message}`);
        handleError(error, res);
    }
});

module.exports = router;