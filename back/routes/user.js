const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, getCurrentUser} = require('../controllers/user');
const {authMiddleware} = require('../services/auth');

router.get('/', authMiddleware, getAllUsers);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/:user_id', authMiddleware, getUserById);


module.exports = router;