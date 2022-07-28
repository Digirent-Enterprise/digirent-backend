const express = require("express");
const authController = require("../../controllers/auth.controller");
const { authenticateToken } = require("../../middlewares/auth");
const router = express.Router();
router.post("/register", async (req, res) => authController.register(req, res));
router.post("/login", async (req, res) => authController.login(req, res));
router.post("/refresh-tokens", authenticateToken, async (req, res) =>
  authController.refreshTokens(req, res),
);
router.post("/logout", authenticateToken, async (req, res) =>
  authController.logout(req, res),
);

module.exports = router;
