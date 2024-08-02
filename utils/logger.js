const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
});

// Log a message with info level
const info = (message) => {
    logger.info(message);
};

// Log a message with warning level
const warn = (message) => {
    logger.warn(message);
};

// Log a message with error level
const error = (message) => {
    logger.error(message);
};

// Add a listener to handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
    error(`Uncaught Exception: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    error(`Unhandled Rejection: ${reason}`);
});

module.exports = {
    info,
    warn,
    error,
};