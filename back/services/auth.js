require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const JWT_SECRET = process.env["JWT_SECRET"];

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: 'file:./pokecenter.db' })
});


async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}


async function loginUser(username, password) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return { success: false, error: 'Utilisateur non trouvé' };

  const valid = await verifyPassword(password, user.password);
  if (!valid) return { success: false, error: 'Mot de passe incorrect' };

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '15min' });
  return { success: true, user: { id: user.id, username: user.username }, token };
}

module.exports = {
  loginUser
};