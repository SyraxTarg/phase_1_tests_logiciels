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

async function seedCards() {
    console.log("Modèles disponibles dans Prisma :", Object.keys(prisma).filter(k => !k.startsWith('_')));
  await prisma.card.create({
    data: {
      name: "Pikachu",
      description: "Pokémon souris",
      type: "Electric",
      pv: 70,
      image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/b1/5c/25/19225777/3756-1/tsp20241106022234/Carte-a-collectionner-Pokemon-Carte-Promo-Go-1-Bonus-de-commande-ne-peut-etre-vendu-separement.jpg",
      user: { connect: { id: 1 } }
    }
  });

  await prisma.card.create({
    data: {
      name: "Mewtwo",
      description: "Pokémon mystique",
      type: "Psy",
      pv: 170,
      image: "https://www.ultrajeux.com/images/produits/maxi/13583.jpg",
      user: { connect: { id: 1 } }
    }
  });

  console.log("Cartes seedées avec succès !");
}

module.exports = { seedUsers, seedCards };