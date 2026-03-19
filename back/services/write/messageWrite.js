const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: 'file:./pokecenter.db' })
});

async function createMessage(transactionId, userId, content) {
  const message = await prisma.message.create({
    data: {
      content,
      transaction: { connect: { id: transactionId } },
      user: { connect: { id: userId } }
    },
    include: {
      user: true
    }
  });
  return message;
}

module.exports = {
  createMessage
};