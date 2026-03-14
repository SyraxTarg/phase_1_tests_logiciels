const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../services/auth');
const {createNewTransaction, getTransactionsByProposer, patchTransactionStatus} = require('../controllers/transaction');

router.post('/', authMiddleware, createNewTransaction);

router.get('/proposer/:user_id', authMiddleware, getTransactionsByProposer);

router.patch('/:transaction_id', authMiddleware, patchTransactionStatus);
module.exports = router;