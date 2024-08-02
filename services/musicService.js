const { createAudioPlayer, createAudioResource, AudioPlayerStatus, joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const logger = require('../utils/logger');
const queueService = require('./queueService');

class MusicService {
    async play(guild, songUrl) {
        const serverQueue = queueService.getQueue(guild.id);
        if (!serverQueue) {
            logger.error('Server queue not found.');
            throw new Error('No queue found.');
        }
        
        const connection = joinVoiceChannel({
            channelId: serverQueue.voiceChannel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });
        
        const player = createAudioPlayer();
        serverQueue.player = player;
        serverQueue.connection = connection;

        connection.subscribe(player);
        
        const audioResource = await this.loadSong(songUrl);
        player.play(audioResource);

        player.on(AudioPlayerStatus.Playing, () => {
            serverQueue.playing = true;
            logger.info(`Started playing: ${songUrl}`);
        });

        player.on('error', error => {
            logger.error(`Error while playing: ${error.message}`);
            serverQueue.songs.shift();
            this.play(guild, serverQueue.songs[0].url);
        });

        player.on(AudioPlayerStatus.Idle, () => {
            serverQueue.songs.shift();
            if (serverQueue.songs.length > 0) {
                this.play(guild, serverQueue.songs[0].url);
            } else {
                connection.destroy();
                queueService.clearQueue(guild.id);
            }
        });
    }

    async loadSong(songUrl) {
        if (ytdl.validateURL(songUrl)) {
            const info = await ytdl.getInfo(songUrl);
            const audioStream = ytdl(songUrl, { filter: 'audioonly' });
            return createAudioResource(audioStream);
        } else {
            logger.error('Invalid song URL.');
            throw new Error('Invalid song URL.');
        }
    }

    async stop(guild) {
        const serverQueue = queueService.getQueue(guild.id);
        if (!serverQueue) {
            throw new Error('No queue found.');
        }

        serverQueue.songs = [];
        if (serverQueue.connection) {
            serverQueue.connection.destroy();
        }
        queueService.clearQueue(guild.id);
        logger.info('Playback stopped and queue cleared.');
    }

    async pause(guild) {
        const serverQueue = queueService.getQueue(guild.id);
        if (!serverQueue || !serverQueue.player) {
            throw new Error('No music is currently playing.');
        }
        serverQueue.player.pause();
        logger.info('Playback paused.');
    }

    async resume(guild) {
        const serverQueue = queueService.getQueue(guild.id);
        if (!serverQueue || !serverQueue.player) {
            throw new Error('No music is currently paused.');
        }
        serverQueue.player.unpause();
        logger.info('Playback resumed.');
    }

    async skip(guild) {
        const serverQueue = queueService.getQueue(guild.id);
        if (!serverQueue || !serverQueue.player) {
            throw new Error('No song in the queue to skip.');
        }
        serverQueue.songs.shift();
        if (serverQueue.songs.length > 0) {
            this.play(guild, serverQueue.songs[0].url);
        } else {
            await this.stop(guild);
        }
    }
}

module.exports = new MusicService();