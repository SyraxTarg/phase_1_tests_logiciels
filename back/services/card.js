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


async function findCardsByName(name) {
  return prisma.card.findMany({
    where: {
      name: {
        contains: name
      },
    },
    include: {
      user: true
    }
  });
}

module.exports = {
  findCardsByUserId,
  findCardsByName
};