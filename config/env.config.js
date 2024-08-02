const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    discordBotToken: process.env.DISCORD_BOT_TOKEN,
    mongodbUri: process.env.MONGODB_URI,
    youtubeApiKey: process.env.YOUTUBE_API_KEY,
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    soundcloudClientId: process.env.SOUNDCLOUD_CLIENT_ID,
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
};

// Validate required environment variables
function validateConfig() {
    const requiredConfigs = [
        'discordBotToken',
        'mongodbUri',
        'youtubeApiKey',
        'spotifyClientId',
        'spotifyClientSecret',
        'soundcloudClientId'
    ];
    
    requiredConfigs.forEach((key) => {
        if (!config[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    });
}

try {
    validateConfig();
} catch (error) {
    console.error(`Configuration error: ${error.message}`);
    process.exit(1); // Exit the application if configuration is invalid
}

module.exports = config;