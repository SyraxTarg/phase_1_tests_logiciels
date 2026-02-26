const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: "file:./pokecenter.db" });
const prisma = new PrismaClient({ adapter });

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function seedUsers() {
    await prisma.user.create({
    data: { username: "Alice", password: await hashPassword("password123") },
    });

    await prisma.user.create({
    data: { username: "Toto", password: await hashPassword("password456") },
    });
  console.log("Utilisateurs seedés avec succès !");
}

async function seedCards() {
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

  await prisma.card.create({
    data: {
      name: "Salamèche",
      description: "Pokémon lézard",
      type: "Feu",
      pv: 60,
      image: "https://www.cards-capital.com/88916/salameche.jpg",
      user: { connect: { id: 2 } }
    }
  });

  await prisma.card.create({
    data: {
      name: "Trompignon",
      description: "Pokémon champignon",
      type: "Plante",
      pv: 40,
      image: "https://www.cards-capital.com/33387/trompignon.jpg",
      user: { connect: { id: 2 } }
    }
  });

  console.log("Cartes seedées avec succès !");
}


async function seedTransactions() {

  const transaction = await prisma.transaction.create({
    data: {
      proposerId: 1,
      receiverId: 2,

      cardsExchange: {
        create: [
          { cardId: 1 },
          { cardId: 2 },
        ],
      },

      cardsReceive: {
        create: [
          { cardId: 3 },
          { cardId: 4 },
        ],
      },
    },
  });

  await prisma.message.create({
    data: {
      content: "Salut, veux-tu échanger ?",
      transaction: { connect: { id: transaction.id } },
      user: { connect: { id: 1 } }
    },
  });

  await prisma.message.create({
    data: {
      content: "Oui, je suis partant !",
      transaction: { connect: { id: transaction.id } },
      user: { connect: { id: 2 } }
    },
  });

  console.log("Transactions et messages seedés !");
}

module.exports = { seedUsers, seedCards, seedTransactions };