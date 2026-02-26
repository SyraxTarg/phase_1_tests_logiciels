const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/user');
const {authMiddleware} = require('../services/auth');

router.get('/', authMiddleware, getAllUsers);

module.exports = router;