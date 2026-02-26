const express = require('express');

const { seedUsers, seedCards, seedTransactions } = require('./services/seed');

const app = express();
app.use(express.json());

async function runSeeds() {
  try {
    await seedUsers();
    await seedCards();
    await seedTransactions();
  } catch (e) {
    console.error(e);
  }
}
// runSeeds();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const transactionRouter = require('./routes/transaction');
const messageRouter = require('./routes/message');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/cards', cardRouter);
app.use('/transactions', transactionRouter);
app.use('/messages', messageRouter);



app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});