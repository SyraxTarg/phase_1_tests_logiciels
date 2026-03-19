const {
    createTransaction,
    changeTransactionStatus
 } = require('../services/write/transactionWrite');

class CreateTransactionHandler {
  async handle(command) {
    if (!command || !command.proposerId || !command.receiverId || !command.proposerCardIds || !command.receiverCardIds) {
      throw new Error('CreateTransaction requires proposerId, receiverId, proposerCardIds, receiverCardIds');
    }
    return await createTransaction(
        command.proposerId,
        command.receiverId,
        command.proposerCardIds,
        command.receiverCardIds,
        command.messageContent
    );
  }
}

class ChangeTransactionStatusHandler {
  async handle(command) {
    if (!command || !command.transactionId || !command.newStatus) {
      throw new Error('CreateTransaction requires transactionId, newStatus');
    }
    return await changeTransactionStatus(
        command.transactionId,
        command.newStatus
    );
  }
}

module.exports = {
    CreateTransactionHandler,
    ChangeTransactionStatusHandler
};