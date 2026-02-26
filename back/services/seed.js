const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: "file:./pokecenter.db" });
const prisma = new PrismaClient({ adapter });

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function seedUsers() {
  const users = [
    { username: "Alice", password: await hashPassword("password123") },
    { username: "Toto", password: await hashPassword("password456") }
  ];

  await prisma.user.createMany({ data: users});
  console.log("Utilisateurs seedés avec succès !");
}

module.exports = { seedUsers };