const commands = new Map();

function registerCommand(command) {
    commands.set(command.name, command);
}

function getCommand(commandName) {
    return commands.get(commandName);
}

// Register all command files
const playCommand = require('../commands/play');
const pauseCommand = require('../commands/pause');
const resumeCommand = require('../commands/resume');
const stopCommand = require('../commands/stop');
const skipCommand = require('../commands/skip');
const queueCommand = require('../commands/queue');

registerCommand(playCommand);
registerCommand(pauseCommand);
registerCommand(resumeCommand);
registerCommand(stopCommand);
registerCommand(skipCommand);
registerCommand(queueCommand);

module.exports = {
    getCommand,
};