const { TransactionStatus } = require('@prisma/client');

const isValidStatus = (status) => {
  const validStatuses = Object.values(TransactionStatus);
  return validStatuses.includes(status);
};

const getValidStatuses = () => {
  return Object.values(TransactionStatus);
}

const isAccepted = (status) => {
  return status == TransactionStatus.accepted;
}

const isPending = (status) => {
  return status == TransactionStatus.pending;
}

const isRejected = (status) => {
  return status == TransactionStatus.rejected;
}

module.exports = {
  isValidStatus,
  getValidStatuses,
  isAccepted,
  isPending,
  isRejected
};