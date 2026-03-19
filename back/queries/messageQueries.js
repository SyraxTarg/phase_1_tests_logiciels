class GetMessagesByTransactionQuery {
  constructor({ transactionId}) {
    this.transactionId = transactionId;
  }
}

module.exports = { GetMessagesByTransactionQuery };