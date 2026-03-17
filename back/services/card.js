const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: 'file:./pokecenter.db' })
});


async function findCardsByUserId(userId) {
  return prisma.card.findMany({
    where: {
      userId: userId
    },
    include: {
      user: true
    }
  });
}


async function findCards(name, type) {
  return prisma.card.findMany({
    where: {
      name: name ? { contains: name } : undefined,

      type: type ?? undefined
    },
    include: {
      user: true
    }
  });
}


async function changeCardUser(card_id, user_id) {
  return prisma.card.update({
    where: {id: card_id},
    data: {
      user: {
        connect: { id: user_id }
      }}
  })
}

async function setMaskedCard(is_masked, card_id) {
  return prisma.card.update({
    where: {id: card_id},
    data: {
      masked: is_masked
    }
  })
}



module.exports = {
  findCardsByUserId,
  findCards,
  changeCardUser,
  setMaskedCard
};