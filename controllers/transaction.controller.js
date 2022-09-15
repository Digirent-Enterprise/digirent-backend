const { TransactionService } = require("../services");
const { Transaction } = require("../models");

const getAllTransaction = async (req, res) => {
  const found = await TransactionService.getAllTransactions();
  if (!found) return res.sendStatus(404);
  return res.status(200).json(found);
};

const getTransactionByUserEmail = async (req, res) => {
  const { user } = req;
  if (!user) return res.sendStatus(401);
  const found = await TransactionService.getTransactionByUserEmail(user.email);
  if (!found) return res.sendStatus(404);
  return res.status(200).json(found);
};

const deleteTransaction = async (req, res) => {
  const { id } = req.query;
  const deletedTransaction = await TransactionService.deleteTransactions(id);
  if (!deletedTransaction) res.sendStatus(404);
  return res.status(200).json(deletedTransaction);
};

const changeTransactionStatus = async (req, res) => {
  const { intent } = req.body;
  const found = await TransactionService.changeTransactionStatus(
    intent,
    req.body,
  );
  if (!found) return res.sendStatus(404);
  return res.status(200).send("change status successfully");
};

const getTransactionDetail = async (req, res) => {
  const { user } = req;
  if (!user) return res.sendStatus(401);
  const { email } = user;
  const { id } = req.query;
  const transaction = await TransactionService.getTransactionDetail(id);
  if (!transaction) return res.sendStatus(404);
  if (transaction.userEmail !== email) return res.sendStatus(403);
  return res.status(200).json(transaction);
};

const getTransactionByIntent = async (req, res) => {
  const { intent } = req.query;
  if (!intent) return res.sendStatus(401);
  const transaction = await TransactionService.getTransactionByIntent(intent);
  if (!transaction) return res.sendStatus(404);
  return res.json(transaction);
};

const createTransaction = async (req, res) => {
  const data = await TransactionService.createTransaction(req.body);
  if (!data) return res.send("Some fields are missing or invalid");
  return res.status(200).send(data);
};

module.exports = {
  getAllTransaction,
  getTransactionDetail,
  getTransactionByUserEmail,
  deleteTransaction,
  changeTransactionStatus,
  createTransaction,
  getTransactionByIntent,
};
