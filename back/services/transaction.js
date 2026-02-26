const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: 'file:./pokecenter.db' })
});

async function createTransaction(proposerId, receiverId, proposerCardIds, receiverCardIds, messageContent) {
  const proposer = await prisma.user.findUnique({ where: { id: proposerId } });
  const receiver = await prisma.user.findUnique({ where: { id: receiverId } });

  if (!proposer || !receiver) {
    throw new Error('Proposer ou receiver introuvable');
  }

  const transaction = await prisma.transaction.create({
    data: {
      proposer: { connect: { id: proposerId } },   
      receiver: { connect: { id: receiverId } },   
      cardsExchange: {
        create: proposerCardIds.map(cardId => ({ card: { connect: { id: cardId } } }))
      },
      cardsReceive: {
        create: receiverCardIds.map(cardId => ({ card: { connect: { id: cardId } } }))
      },
      messages: messageContent
        ? { create: { content: messageContent } }
        : undefined
    },
    include: {
      proposer: true,  
      receiver: true,  
      cardsExchange: { include: { card: true } },
      cardsReceive: { include: { card: true } },
      messages: {include: { user: true }}
    }
  });


  return transaction;
}

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

module.exports = { createTransaction, findTransactionByProposerId };