class CreateMessageCommand {
  constructor({ transactionId, userId, content }) {
    this.transactionId = transactionId;
    this.userId = userId;
    this.content = content;
  }
}

module.exports = { CreateMessageCommand };