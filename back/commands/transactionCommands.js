class CreateTransactionCommand {
  constructor({ proposerId, receiverId, proposerCardIds, receiverCardIds, messageContent }) {
    this.proposerId = proposerId;
    this.receiverId = receiverId;
    this.proposerCardIds = proposerCardIds;
    this.receiverCardIds = receiverCardIds;
    this.messageContent = messageContent;
  }
}

class ChangeTransactionStatusCommand {
  constructor({ transactionId, newStatus }) {
    this.transactionId = transactionId;
    this.newStatus = newStatus;
  }
}

module.exports = { 
    CreateTransactionCommand,
    ChangeTransactionStatusCommand
};