const { PermissionsBitField } = require('discord.js');
const logger = require('../utils/logger');

// Middleware to check permissions
const checkPermissions = (requiredPermissions) => {
    return (interaction, next) => {
        const member = interaction.member;

        // Check if the member has the required permissions
        if (!member.permissions.has(requiredPermissions)) {
            logger.warn(`User ${member.user.tag} does not have permissions: ${requiredPermissions.toArray().join(', ')}`);
            return interaction.reply({
                content: 'You do not have permission to perform this action.',
                ephemeral: true,
            });
        }
        
        // Proceed to the next middleware or command
        next();
    };
};

// Middleware to check if user is in a voice channel
const checkVoiceChannel = (interaction, next) => {
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
        logger.warn(`User ${interaction.user.tag} attempted to use a music command without being in a voice channel.`);
        return interaction.reply({
            content: 'You need to be in a voice channel to use this command.',
            ephemeral: true,
        });
    }

    next();
};

// Middleware to ensure the bot has permissions to connect to the voice channel
const checkBotPermissions = (interaction, next) => {
    const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
    
    if (!botMember.permissions.has(PermissionsBitField.Flags.Connect | PermissionsBitField.Flags.Speak)) {
        logger.warn(`Bot does not have permissions to connect or speak in the voice channel.`);
        return interaction.reply({
            content: 'I do not have permissions to join this voice channel.',
            ephemeral: true,
        });
    }

    next();
};

module.exports = {
    checkPermissions,
    checkVoiceChannel,
    checkBotPermissions,
};