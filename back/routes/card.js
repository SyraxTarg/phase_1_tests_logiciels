const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../services/auth');
const {getCardsByUser} = require('../controllers/card');

router.get('/:user_id', authMiddleware, getCardsByUser);

module.exports = router;