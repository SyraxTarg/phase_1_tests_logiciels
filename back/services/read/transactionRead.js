const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');


const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: 'file:./pokecenter.db' })
});

async function findTransactionByProposerId(proposerId) {
  return prisma.transaction.findMany({
    where: {
      proposerId: proposerId
    },
    include: {
      proposer: true,
      receiver: true,
      cardsExchange: { include: { card: true } },
      cardsReceive: { include: { card: true } },
      messages: true
    }
  });
}


async function findTransactionByReceiverId(receiverId) {
  return prisma.transaction.findMany({
    where: {
      receiverId: receiverId
    },
    include: {
      proposer: true,
      receiver: true,
      cardsExchange: { include: { card: true } },
      cardsReceive: { include: { card: true } },
      messages: true
    }
  });
}

async function findTransactionById(transactionId) {
  return prisma.transaction.findUnique({
    where: {
      id: transactionId
    },
    include: {
      proposer: true,
      receiver: true,
      cardsExchange: { include: { card: true } },
      cardsReceive: { include: { card: true } },
      messages: true
    }
  });
}


module.exports = {
  findTransactionByProposerId,
  findTransactionById,
  findTransactionByReceiverId
};
