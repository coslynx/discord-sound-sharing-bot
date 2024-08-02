const { Events } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        try {
            const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
            if (!welcomeChannel) return;

            await welcomeChannel.send(`Welcome to the server, ${member.user.username}! Enjoy your stay!`);
            logger.info(`Sent welcome message to ${member.user.username} in ${member.guild.name}`);
        } catch (error) {
            logger.error(`Error in guildMemberAdd event for ${member.user.username}: ${error.message}`);
        }
    },
};