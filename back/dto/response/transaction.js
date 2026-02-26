const {cardsDto} = require('./findCards');
const {messagesDto} = require('./messages');
const {userDto} = require('./findUser');
function transactionDto(transaction) {
  return {
    id: transaction.id,
    proposer: userDto(transaction.proposer),
    receiver: userDto(transaction.receiver),
    cardsExchange: cardsDto(transaction.cardsExchange),
    cardsReceive: cardsDto(transaction.cardsReceive),
    messages: messagesDto(transaction.messages)
  };
}

module.exports = { transactionDto };