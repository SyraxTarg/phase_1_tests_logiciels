const express = require('express');
const { loginUser } = require('../services/auth');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username et password required' });
  const result = await loginUser(username, password);
  if (!result.success) return res.status(401).json({ error: result.error });

  res.json({token: result.token });
};

module.exports = {login};