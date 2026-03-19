const { seedUsers, seedCards, seedTransactions } = require('../services/write/seedWrite');

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