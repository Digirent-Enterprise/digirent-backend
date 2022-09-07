const authController = require("./auth.controller");
const categoryController = require("./category.controller");
const productController = require("./product.controller");
const userController = require("./user.controller");
const transactionController = require("./transaction.controller");
const inquiryController = require('./inquiry.controller');
const chatController = require ("./chat.controller")
const messageController = require("./message.controller")

module.exports = {
  authController,
  categoryController,
  productController,
  userController,
  transactionController,
  inquiryController,
  chatController,
  messageController
};
