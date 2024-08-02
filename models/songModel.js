const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        required: true
    },
    requestedBy: {
        type: String,
        required: true
    },
    source: {
        type: String,
        enum: ['YouTube', 'Spotify', 'SoundCloud'],
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;