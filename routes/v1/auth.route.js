const express = require('express');
const authController = require('../../controllers/auth.controller');
const {authenticateToken} = require('../../middlewares/auth')
const router = express.Router();
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.post('/refresh-tokens',  authenticateToken, (req, res) => authController.refreshTokens(req, res))

module.exports = router;
