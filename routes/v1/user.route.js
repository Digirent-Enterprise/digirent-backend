const express = require('express');
const auth = require('../../middlewares/auth');

const router = express.Router();

// router
//     .route('/')
//     .post(auth('manageUsers'), (req,res,next) => userController.register(req,res,next))
//     .get(auth('getUsers'), (req,res,next) =>userController.getUsers(req,res,next))
//
// router
//     .route('/:userId')
//     .get(auth('getUsers'), (req,res,next) => userController.getUser(req,res,next))
//     .patch(auth('manageUsers'), (req,res,next) =>userController.updateUser(req,res,next))
//     .delete(auth('manageUsers'), (req,res,next) =>userController.deleteUser(req,res,next))

module.exports = router;
