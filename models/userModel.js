const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

async function createUser(discordId, username) {
    try {
        const user = new User({ discordId, username });
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Unable to create user: ' + error.message);
    }
}

async function getUserById(discordId) {
    try {
        const user = await User.findOne({ discordId });
        return user;
    } catch (error) {
        throw new Error('Unable to find user: ' + error.message);
    }
}

async function addPlaylistToUser(discordId, playlistId) {
    try {
        const user = await User.findOne({ discordId });
        if (!user) {
            throw new Error('User not found');
        }
        user.playlists.push(playlistId);
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Unable to add playlist to user: ' + error.message);
    }
}

module.exports = {
    User,
    createUser,
    getUserById,
    addPlaylistToUser,
};