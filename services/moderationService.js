const logger = require('../utils/logger');
const { PermissionsBitField } = require('discord.js');

// Function to mute the bot in a voice channel
async function muteBot(interaction) {
    try {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to mute the bot.');
        }

        const botMember = voiceChannel.guild.members.cache.get(interaction.client.user.id);
        if (!botMember) {
            return interaction.reply('Could not find the bot in the voice channel.');
        }

        if (!botMember.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return interaction.reply('I do not have permission to mute myself in this voice channel.');
        }

        await botMember.voice.setMute(true);
        logger.info(`Bot muted in voice channel: ${voiceChannel.name}`);
        await interaction.reply('The bot has been muted.');
    } catch (error) {
        logger.error(`Error muting bot: ${error.message}`);
        await interaction.reply('An error occurred while trying to mute the bot.');
    }
}

// Function to unmute the bot in a voice channel
async function unmuteBot(interaction) {
    try {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to unmute the bot.');
        }

        const botMember = voiceChannel.guild.members.cache.get(interaction.client.user.id);
        if (!botMember) {
            return interaction.reply('Could not find the bot in the voice channel.');
        }

        if (!botMember.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return interaction.reply('I do not have permission to unmute myself in this voice channel.');
        }

        await botMember.voice.setMute(false);
        logger.info(`Bot unmuted in voice channel: ${voiceChannel.name}`);
        await interaction.reply('The bot has been unmuted.');
    } catch (error) {
        logger.error(`Error unmuting bot: ${error.message}`);
        await interaction.reply('An error occurred while trying to unmute the bot.');
    }
}

// Function to kick the bot from a voice channel
async function kickBot(interaction) {
    try {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to kick the bot.');
        }

        const botMember = voiceChannel.guild.members.cache.get(interaction.client.user.id);
        if (!botMember) {
            return interaction.reply('Could not find the bot in the voice channel.');
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply('You do not have permission to kick the bot.');
        }

        await botMember.voice.disconnect();
        logger.info(`Bot kicked from voice channel: ${voiceChannel.name}`);
        await interaction.reply('The bot has been kicked from the voice channel.');
    } catch (error) {
        logger.error(`Error kicking bot: ${error.message}`);
        await interaction.reply('An error occurred while trying to kick the bot.');
    }
}

// Exporting moderation functions
module.exports = {
    muteBot,
    unmuteBot,
    kickBot,
};