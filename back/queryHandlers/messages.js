const { findMessagesByTransaction } = require('../services/read/messageRead');

class GetMessagesByTransactionHandler {
  async handle(query) {
    if (!query || !query.transactionId) {
      throw new Error('GetMessagesByTransaction requires transactionId');
    }
    return await findMessagesByTransaction(query.transactionId);
  }
}

module.exports = { GetMessagesByTransactionHandler };