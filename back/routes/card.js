const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../services/auth');
const {
    getCardsByUser,
    getCards
} = require('../controllers/card');

router.get('/', authMiddleware, getCards);
router.get('/:user_id', authMiddleware, getCardsByUser);

module.exports = router;