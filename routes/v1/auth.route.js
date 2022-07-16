const express = require('express');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.post('/logout', (req, res, next) => authController.logout(req, res, next));
router.post('/refresh-tokens', (req, res, next) => authController.refreshTokens(req, res, next));
router.post('/forgot-password', (req, res, next) => authController.forgotPassword(req, res, next));
router.post('/reset-password', (req, res, next) => authController.resetPassword(req, res, next));
router.post('/send-verification-email', (req, res, next) => authController.sendVerificationEmail(req, res, next));
router.post('/verify-email', (req, res, next) => authController.verifyEmail(req, res, next));

module.exports = router;
