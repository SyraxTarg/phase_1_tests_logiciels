const {
    findTransactionByProposerId,
    findTransactionByReceiverId,
    findTransactionById
 } = require('../services/read/transactionRead');

class GetTransactionsByProposerHandler {
  async handle(query) {
    if (!query || !query.proposerId) {
      throw new Error('GetTransactionsByProposer requires proposerId');
    }
    return await findTransactionByProposerId(query.proposerId);
  }
}

class GetTransactionsByReceiverHandler {
  async handle(query) {
    if (!query || !query.receiverId) {
      throw new Error('GetTransactionsByReceiver requires receiverId');
    }
    return await findTransactionByReceiverId(query.receiverId);
  }
}

class GetTransactionsByIdHandler {
  async handle(query) {
    if (!query || !query.transactionId) {
      throw new Error('GetTransactionsById requires transactionId');
    }
    return await findTransactionById(query.transactionId);
  }
}

module.exports = {
    GetTransactionsByProposerHandler,
    GetTransactionsByReceiverHandler,
    GetTransactionsByIdHandler
};