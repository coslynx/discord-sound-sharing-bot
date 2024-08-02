const logger = require('../utils/logger');

const logRequest = (req, res, next) => {
    try {
        const { method, url } = req;
        logger.info(`Incoming Request: ${method} ${url}`);
        next();
    } catch (error) {
        logger.error(`Error logging request: ${error.message}`);
        next(error);
    }
};

const logResponse = (req, res, next) => {
    res.on('finish', () => {
        const { method, url } = req;
        const { statusCode } = res;
        logger.info(`Response: ${method} ${url} completed with status code: ${statusCode}`);
    });
    next();
};

module.exports = { logRequest, logResponse };