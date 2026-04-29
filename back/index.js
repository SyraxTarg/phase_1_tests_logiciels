const express = require('express');

const app = express();
app.use(express.json());


const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const transactionRouter = require('./routes/transaction');
const messageRouter = require('./routes/message');
const healthRouter = require('./routes/health');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/cards', cardRouter);
app.use('/transactions', transactionRouter);
app.use('/messages', messageRouter);
app.use('/health', healthRouter);

const LISTEN_PORT = process.env["LISTEN_PORT"]


app.listen(LISTEN_PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${LISTEN_PORT}`);
});