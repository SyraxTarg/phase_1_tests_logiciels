const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../services/auth');
const {getMessagesByTransaction, postMessage} = require('../controllers/message');

router.get('/:transaction_id', authMiddleware, getMessagesByTransaction);
router.post('/:transaction_id', authMiddleware, postMessage);


module.exports = router;