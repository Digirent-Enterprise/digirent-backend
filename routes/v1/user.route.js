const express = require('express');
const {userController} = require('../../controllers')
const {authenticateAdmin} = require("../../middlewares/auth");
const router = express.Router();

router.post('/delete-user', authenticateAdmin,(req, res) => userController.deleteUser(req, res));

module.exports = router;
