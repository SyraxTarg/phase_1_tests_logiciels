require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const JWT_SECRET = process.env["JWT_SECRET"];
const DATABASE_URL = process.env["DATABASE_URL"]

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: DATABASE_URL })
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

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
}

module.exports = {
  loginUser,
  authMiddleware
};