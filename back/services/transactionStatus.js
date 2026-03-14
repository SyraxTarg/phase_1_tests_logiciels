const { TransactionStatus } = require('@prisma/client');

const isValidStatus = (status) => {
  const validStatuses = Object.values(TransactionStatus);
  return validStatuses.includes(status);
};

const getValidStatuses = () => {
  return Object.values(TransactionStatus);
}

module.exports = {
  isValidStatus,
  getValidStatuses
};