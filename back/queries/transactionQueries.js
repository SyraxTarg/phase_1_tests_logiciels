class GetTransactionsByProposerQuery {
  constructor({ proposerId }) {
    this.proposerId = proposerId;
  }
}

class GetTransactionsByReceiverQuery {
  constructor({ receiverId }) {
    this.receiverId = receiverId;
  }
}

class GetTransactionsByIdQuery {
  constructor({ transactionId }) {
    this.transactionId = transactionId;
  }
}

module.exports = {
    GetTransactionsByProposerQuery,
    GetTransactionsByReceiverQuery,
    GetTransactionsByIdQuery
};