const { Events } = require('discord.js');
const logger = require('../utils/logger');
const commandHandler = require('../utils/commandHandler');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Ignore messages from bots
        if (message.author.bot) return;

        try {
            // Check if the message starts with the command prefix
            if (!message.content.startsWith('!')) return;

            // Parse and execute command
            const args = message.content.slice(1).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = commandHandler.getCommand(commandName);
            if (!command) {
                return message.reply('Unknown command. Please use a valid command.');
            }

            await command.execute(message, args);
        } catch (error) {
            logger.error(`Error handling message: ${error.message}`);
            await message.reply('An error occurred while processing your command.');
        }
    },
};