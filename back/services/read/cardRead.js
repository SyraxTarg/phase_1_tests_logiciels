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


async function findCardById(card_id) {
  return prisma.card.findUnique({
    where: {id: card_id},
    include: {
      user: true
    }
  })
}



module.exports = {
  findCardsByUserId,
  findCards,
  findCardById
};