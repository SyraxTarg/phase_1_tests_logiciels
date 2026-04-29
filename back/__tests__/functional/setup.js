const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const fs = require("fs");
const path = require("path");

const adapter = new PrismaBetterSqlite3({ url: "file:./pokecenter-test.db" });
const prisma = new PrismaClient({ adapter });

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function seedUsers() {
  await prisma.user.create({
    data: { username: "Alice", password: await hashPassword("password123") },
  });

  await prisma.user.create({
    data: { username: "Bob", password: await hashPassword("password456") },
  });

  await prisma.user.create({
    data: { username: "Ash", password: await hashPassword("password789") },
  });

  await prisma.user.create({
    data: { username: "Iris", password: await hashPassword("password789") },
  });

  await prisma.user.create({
    data: { username: "Joelle", password: await hashPassword("password789") },
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
      masked: false,
      image:
        "https://static.fnac-static.com/multimedia/Images/FR/MDM/b1/5c/25/19225777/3756-1/tsp20241106022234/Carte-a-collectionner-Pokemon-Carte-Promo-Go-1-Bonus-de-commande-ne-peut-etre-vendu-separement.jpg",
      user: { connect: { id: 1 } },
    },
  });

  await prisma.card.create({
    data: {
      name: "Mewtwo",
      description: "Pokémon mystique",
      type: "Psy",
      pv: 170,
      masked: false,
      image: "https://www.ultrajeux.com/images/produits/maxi/13583.jpg",
      user: { connect: { id: 1 } },
    },
  });

  await prisma.card.create({
    data: {
      name: "Salamèche",
      description: "Pokémon lézard",
      type: "Feu",
      pv: 60,
      masked: false,
      image: "https://www.cards-capital.com/88916/salameche.jpg",
      user: { connect: { id: 2 } },
    },
  });

  await prisma.card.create({
    data: {
      name: "Trompignon",
      description: "Pokémon champignon",
      type: "Plante",
      pv: 40,
      masked: false,
      image: "https://www.cards-capital.com/33387/trompignon.jpg",
      user: { connect: { id: 2 } },
    },
  });

  await prisma.card.create({
    data: {
      name: "Gruikui",
      description: "Pokémon cochon feu",
      type: "Feu",
      pv: 70,
      masked: false,
      image:
        "https://assets.pokemon.com/static-assets/content-assets/cms2-fr-fr/img/cards/web/BWP/BWP_FR_BW02.png",
      user: { connect: { id: 3 } },
    },
  });

  await prisma.card.create({
    data: {
      name: "Xerneas",
      description: "Pokémon existence",
      type: "Fée",
      pv: 170,
      masked: false,
      image:
        "https://assets.pokemon.com/static-assets/content-assets/cms2-fr-fr/img/cards/web/XY1/XY1_FR_146.png",
      user: { connect: { id: 3 } },
    },
  });

  await prisma.card.create({
    data: {
      name: "Dracolosse",
      description: "Pokémon dragon",
      type: "Dragon",
      pv: 180,
      masked: false,
      image:
        "https://assets.pokemon.com/static-assets/content-assets/cms2-fr-fr/img/cards/web/SV3PT5/SV3PT5_FR_149.png",
      user: { connect: { id: 4 } },
    },
  });

  await prisma.card.create({
    data: {
      name: "Nanméouie",
      description: "Pokémon audition",
      type: "Normal",
      pv: 100,
      masked: false,
      image:
        "https://www.pokepedia.fr/images/thumb/8/8c/Carte_%C3%89carlate_et_Violet_Flammes_Obsidiennes_173.png/245px-Carte_%C3%89carlate_et_Violet_Flammes_Obsidiennes_173.png",
      user: { connect: { id: 5 } },
    },
  });

  await prisma.card.create({
    data: {
      name: "Xerneas",
      description: "Pokémon existence",
      type: "Fée",
      pv: 170,
      masked: false,
      image:
        "https://assets.pokemon.com/static-assets/content-assets/cms2-fr-fr/img/cards/web/XY1/XY1_FR_146.png",
      user: { connect: { id: 1 } },
    },
  });

  console.log("Cartes seedées avec succès !");
}

async function seedTransactions() {
  const transaction = await prisma.transaction.create({
    data: {
      proposerId: 1,
      receiverId: 2,

      cardsExchange: {
        create: [{ cardId: 1 }, { cardId: 2 }],
      },

      cardsReceive: {
        create: [{ cardId: 3 }, { cardId: 4 }],
      },
    },
  });

  await prisma.message.create({
    data: {
      content: "Salut, veux-tu échanger ?",
      transaction: { connect: { id: transaction.id } },
      user: { connect: { id: 1 } },
    },
  });

  await prisma.message.create({
    data: {
      content: "Oui, je suis partant !",
      transaction: { connect: { id: transaction.id } },
      user: { connect: { id: 2 } },
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      proposerId: 3,
      receiverId: 5,

      cardsExchange: {
        create: [{ cardId: 5 }],
      },

      cardsReceive: {
        create: [{ cardId: 8 }],
      },
    },
  });

  await prisma.message.create({
    data: {
      content: "Bonjour Joelle, je suis intéressé par ton Nanméouie !",
      transaction: { connect: { id: transaction2.id } },
      user: { connect: { id: 3 } },
    },
  });

  await prisma.message.create({
    data: {
      content: "Je ne suis pas sure ...",
      transaction: { connect: { id: transaction2.id } },
      user: { connect: { id: 5 } },
    },
  });

  await prisma.transaction.create({
    data: {
      proposerId: 4,
      receiverId: 1,

      cardsExchange: {
        create: [{ cardId: 7 }],
      },

      cardsReceive: {
        create: [{ cardId: 1 }],
      },
    },
  });

  await prisma.transaction.create({
    data: {
      proposerId: 5,
      receiverId: 1,

      cardsExchange: {
        create: [{ cardId: 8 }],
      },

      cardsReceive: {
        create: [{ cardId: 9 }],
      },
    },
  });

  console.log("Transactions et messages seedés !");
}

async function runSeeds() {
  try {
    await prisma.transactionCardExchange.deleteMany();
    await prisma.transactionCardReceive.deleteMany();
    await prisma.message.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.card.deleteMany();
    await prisma.user.deleteMany();

    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name='User'`);
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name='Card'`);
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name='Transaction'`);
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name='Message'`);

    await seedUsers();
    await seedCards();
    await seedTransactions();
  } catch (e) {
    console.error(e);
  }
}

async function clearDatabase() {
    try{
        await prisma.user.deleteMany().catch(() => console.log("Table User vide ou inexistante"));
        await prisma.card.deleteMany().catch(() => console.log("Table User vide ou inexistante"));
        await prisma.transaction.deleteMany().catch(() => console.log("Table User vide ou inexistante"));
    } catch (e) {
        console.error(e);
    }
}

module.exports = { runSeeds, clearDatabase };

