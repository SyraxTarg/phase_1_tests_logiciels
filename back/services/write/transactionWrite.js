const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const {isAccepted} = require("../read/transactionStatusRead")
const {findTransactionById} = require("../read/transactionRead")

const {
  changeCardUser,
  setMaskedCard
} = require("./cardWrite")

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
      ? {
          create: {
            content: messageContent,
            user: { connect: { id: proposerId } }
          }
        }
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



async function changeTransactionStatus(transactionId, newStatus) {
  await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: newStatus }
  });

    const transaction = await findTransactionById(transactionId);

    for (const item of transaction.cardsExchange) {
      await changeCardUser(item.card.id, transaction.receiver.id)
      if (isAccepted(newStatus)) {
        await setMaskedCard(true, item.card.id);
      }
    }

    for (const item of transaction.cardsReceive) {
      await changeCardUser(item.card.id, transaction.proposer.id)
      if (isAccepted(newStatus)) {
        await setMaskedCard(true, item.card.id);
      }
    }

    return await findTransactionById(transactionId);
}


module.exports = {
  createTransaction,
  changeTransactionStatus
};
