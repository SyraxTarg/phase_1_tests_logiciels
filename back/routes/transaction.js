const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../services/auth');
const {createNewTransaction, getTransactionsByProposer} = require('../controllers/transaction');

router.post('/', authMiddleware, createNewTransaction);
router.get('/proposer/:user_id', authMiddleware, getTransactionsByProposer);

module.exports = router;