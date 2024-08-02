const { User } = require('../models/userModel');
const logger = require('../utils/logger');

async function authenticateUser(interaction) {
    const userId = interaction.user.id;
    const username = interaction.user.username;

    try {
        let user = await User.findOne({ discordId: userId });
        if (!user) {
            user = await User.create({ discordId: userId, username });
            logger.info(`New user created: ${username} with ID: ${userId}`);
        } else {
            logger.info(`User found: ${username} with ID: ${userId}`);
        }
        return user;
    } catch (error) {
        logger.error(`Error during user authentication: ${error.message}`);
        throw new Error('Authentication failed');
    }
}

module.exports = {
    authenticateUser,
};