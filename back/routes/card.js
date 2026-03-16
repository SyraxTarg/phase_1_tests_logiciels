const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../services/auth');
const {
    getCardsByUser,
    getCardsByName
} = require('../controllers/card');

router.get('/', authMiddleware, getCardsByName);
router.get('/:user_id', authMiddleware, getCardsByUser);

module.exports = router;