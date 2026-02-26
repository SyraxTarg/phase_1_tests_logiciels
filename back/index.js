const express = require('express');

const { seedUsers } = require('./services/seed');

const app = express();
app.use(express.json());
seedUsers().catch(console.error);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);



app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});