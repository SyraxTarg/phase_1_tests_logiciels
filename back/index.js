const express = require('express');

const { seedUsers, seedCards } = require('./services/seed');

const app = express();
app.use(express.json());

async function runSeeds() {
  try {
    await seedUsers();
    await seedCards();
  } catch (e) {
    console.error(e);
  }
}
// runSeeds();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/cards', cardRouter);



app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});