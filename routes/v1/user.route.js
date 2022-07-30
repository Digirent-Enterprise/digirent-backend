const express = require('express');
const {userController} = require('../../controllers')
const {authenticateAdmin, authenticateToken} = require("../../middlewares/auth");
const router = express.Router();

router.post('/delete-user', authenticateAdmin,(req, res) => userController.deleteUser(req, res));
router.get('/user-detail', authenticateToken,(req, res) => userController.getUserDetail(req, res));

module.exports = router;
