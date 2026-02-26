const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../services/auth');
const {getMessagesByTransaction} = require('../controllers/message');

router.get('/:transaction_id', authMiddleware, getMessagesByTransaction);


module.exports = router;