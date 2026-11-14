const express = require('express');
const { register, login } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/register', register); // POST /api/auth/register
authRouter.post('/login', login);       // POST /api/auth/login

module.exports = authRouter;