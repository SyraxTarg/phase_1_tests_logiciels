const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: 'file:./pokecenter.db' })
});


async function findCardByUserId(userId) {
  return prisma.card.findMany({
    where: {
      userId: userId
    },
    include: {
      user: true
    }
  });
}

module.exports = {
  findCardByUserId
};