const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../services/read/authRead');
const {
    getCardsByUser,
    getCards,
    patchMaskedCard
} = require('../controllers/card');

router.get('/', authMiddleware, getCards);
router.get('/:user_id', authMiddleware, getCardsByUser);
router.patch("/:card_id", authMiddleware, patchMaskedCard)

module.exports = router;