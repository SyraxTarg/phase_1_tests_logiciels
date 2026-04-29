const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const DATABASE_URL = process.env["DATABASE_URL"]

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: DATABASE_URL })
});


async function findAllUsers() {
  return prisma.user.findMany();
}

async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

module.exports = {
  findAllUsers,
  findUserById
};