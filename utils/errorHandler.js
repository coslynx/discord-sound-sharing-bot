const logger = require('./logger');

function handleError(error, interaction) {
    logger.error(`Error occurred: ${error.message}`);
    let errorMessage;

    switch (error.name) {
        case 'ValidationError':
            errorMessage = 'There was a validation error. Please ensure your input is correct.';
            break;
        case 'NotFoundError':
            errorMessage = 'The requested resource was not found.';
            break;
        case 'PermissionError':
            errorMessage = 'You do not have permission to perform this action.';
            break;
        case 'NetworkError':
            errorMessage = 'A network error occurred. Please try again later.';
            break;
        default:
            errorMessage = 'An unexpected error occurred. Please try again.';
            break;
    }

    if (interaction) {
        interaction.reply({ content: errorMessage, ephemeral: true });
    }
}

module.exports = {
    handleError,
};