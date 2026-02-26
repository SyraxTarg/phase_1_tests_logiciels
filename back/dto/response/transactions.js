const {transactionDto} = require('./transaction');
function transactionsDto(transactions) {
  return transactions.map(transactionDto);
}

module.exports = { transactionsDto };