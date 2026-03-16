const { seedUsers, seedCards, seedTransactions } = require('../services/seed');

async function runSeeds() {
  try {
    await seedUsers();
    await seedCards();
    await seedTransactions();
  } catch (e) {
    console.error(e);
  }
}
runSeeds();