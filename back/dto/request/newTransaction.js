function newTransactionDto(newTransaction) {
  return {
    proposerId: newTransaction.proposerId,
    proposerCardIds: newTransaction.proposerCardIds,
    receiverCardIds: newTransaction.receiverCardIds,
    receiverId: newTransaction.receiverId,
    messageContent: newTransaction.messageContent
  };
}

module.exports = { newTransactionDto };