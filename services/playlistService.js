const mongoose = require('mongoose');
const Playlist = require('../models/playlistModel');
const logger = require('../utils/logger');

// Function to create a new playlist for a user
async function createPlaylist(userId, playlistName) {
    try {
        const newPlaylist = new Playlist({
            userId,
            name: playlistName,
            songs: []
        });
        await newPlaylist.save();
        logger.info(`Playlist created for user: ${userId}, name: ${playlistName}`);
        return newPlaylist;
    } catch (error) {
        logger.error(`Error creating playlist: ${error.message}`);
        throw new Error('Could not create playlist');
    }
}

// Function to add a song to a playlist
async function addSongToPlaylist(userId, playlistId, song) {
    try {
        const playlist = await Playlist.findOne({ _id: playlistId, userId });
        if (!playlist) {
            throw new Error('Playlist not found');
        }
        playlist.songs.push(song);
        await playlist.save();
        logger.info(`Added song to playlist: ${playlistId}, song: ${song.title}`);
        return playlist;
    } catch (error) {
        logger.error(`Error adding song to playlist: ${error.message}`);
        throw new Error('Could not add song to playlist');
    }
}

// Function to remove a song from a playlist
async function removeSongFromPlaylist(userId, playlistId, songId) {
    try {
        const playlist = await Playlist.findOne({ _id: playlistId, userId });
        if (!playlist) {
            throw new Error('Playlist not found');
        }
        playlist.songs = playlist.songs.filter(song => song._id.toString() !== songId);
        await playlist.save();
        logger.info(`Removed song from playlist: ${playlistId}, songId: ${songId}`);
        return playlist;
    } catch (error) {
        logger.error(`Error removing song from playlist: ${error.message}`);
        throw new Error('Could not remove song from playlist');
    }
}

// Function to get all playlists for a user
async function getUserPlaylists(userId) {
    try {
        const playlists = await Playlist.find({ userId });
        logger.info(`Retrieved playlists for user: ${userId}`);
        return playlists;
    } catch (error) {
        logger.error(`Error retrieving user playlists: ${error.message}`);
        throw new Error('Could not retrieve playlists');
    }
}

// Function to get a specific playlist by ID
async function getPlaylistById(userId, playlistId) {
    try {
        const playlist = await Playlist.findOne({ _id: playlistId, userId });
        if (!playlist) {
            throw new Error('Playlist not found');
        }
        logger.info(`Retrieved playlist: ${playlistId} for user: ${userId}`);
        return playlist;
    } catch (error) {
        logger.error(`Error retrieving playlist: ${error.message}`);
        throw new Error('Could not retrieve playlist');
    }
}

// Function to delete a playlist
async function deletePlaylist(userId, playlistId) {
    try {
        const result = await Playlist.deleteOne({ _id: playlistId, userId });
        if (result.deletedCount === 0) {
            throw new Error('Playlist not found');
        }
        logger.info(`Deleted playlist: ${playlistId} for user: ${userId}`);
    } catch (error) {
        logger.error(`Error deleting playlist: ${error.message}`);
        throw new Error('Could not delete playlist');
    }
}

// Exporting functions
module.exports = {
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getUserPlaylists,
    getPlaylistById,
    deletePlaylist,
};