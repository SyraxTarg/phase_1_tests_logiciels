const { createMessage } = require('../services/write/messageWrite');

class CreateMessageHandler {
  async handle(command) {
    if (!command || !command.transactionId || !command.userId || !command.content) {
      throw new Error('CreateMessage requires transactionId, userId and content');
    }
    return await createMessage(command.transactionId, command.userId, command.content);
  }
}

module.exports = { CreateMessageHandler };