const express = require('express');
const authController = require('../../controllers/auth.controller');
const {authenticateToken, authenticateResetPasswordToken} = require('../../middlewares/auth')
const router = express.Router();
router.post('/register',  (req, res) => authController.register(req, res));
router.post('/login',  (req, res) => authController.login(req, res));
router.post('/refresh-tokens',  authenticateToken, (req, res) => authController.refreshTokens(req, res))
router.post('/logout',  authenticateToken, async (req, res) => authController.logout(req, res))
router.put('/reset-password', authenticateToken, (req, res) => authController.resetPassword(req, res))
router.post('/forgot-password-request', (req, res) => authController.requestForgetPassword(req, res))
router.post('/verify-forgot-password-request', authenticateResetPasswordToken, (req,res) => authController.verifyForgotPasswordRequest(req, res))
router.put('/reset-forgot-password', authenticateResetPasswordToken, (req, res) => authController.resetForgottenPassword(req, res))
// router.get('/forget-password', )
module.exports = router;
