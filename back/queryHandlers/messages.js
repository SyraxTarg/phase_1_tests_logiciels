const { findMessagesByTransaction } = require('../services/read/messageRead');

class GetMessagesByTransactionHandler {
  async handle(command) {
    if (!command || !command.transactionId) {
      throw new Error('GetMessagesByTransaction requires transactionId');
    }
    return await findMessagesByTransaction(command.transactionId);
  }
}

module.exports = { GetMessagesByTransactionHandler };