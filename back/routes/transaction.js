const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../services/read/authRead');
const {
    createNewTransaction,
    getTransactionsByProposer,
    patchTransactionStatus,
    getTransactionsByReceiver,
    getTransactionById
} = require('../controllers/transaction');

router.post('/', authMiddleware, createNewTransaction);

router.get('/proposer/:user_id', authMiddleware, getTransactionsByProposer);

router.get('/receiver/:user_id', authMiddleware, getTransactionsByReceiver);

router.get('/:transaction_id', authMiddleware, getTransactionById);

router.patch('/:transaction_id', authMiddleware, patchTransactionStatus);
module.exports = router;