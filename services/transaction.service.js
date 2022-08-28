const { Transaction, Product } = require("../models");

const getAllTransactions = async () => {
  const transactions = await Transaction.find().populate('productId');
  if (transactions) return transactions;
  return false;
};

const getTransactionByUserEmail = async (email) => {
  console.log("email ", email);
  const transactions = await Transaction.find({ userEmail: email });
  if (transactions) return transactions;
  return false;
};

const changeTransactionStatus = async (intent, status) => {
  let transaction;
  try {
    transaction = await Transaction.findOneAndUpdate(
      { intent: intent },
      { $set: status },
    );
    // make product unavailable
    console.log('statusssssss', status)
    if (status.productId && status.status && status.status === 'paid'){
      await Product.findOneAndUpdate({_id: status.productId}, {status: false})
    }
  } catch (e) {
    return false;
  }
  if (transaction) return transaction;
  return false;
};

const deleteTransactions = async (transactionId) => {
  let transaction;
  try {
    transaction = await Transaction.findOneAndDelete({ _id: transactionId });
  } catch (e) {
    return false;
  }
  if (transaction) return transaction;
  return false;
};

const getTransactionDetail = async (transactionId) => {
  let transaction;
  try {
    transaction = await Transaction.findOne({ _id: transactionId }).populate('productId');
  } catch (e) {
    if (e) return false;
  }
  if (transaction) return transaction;
  return false;
};

const getTransactionByIntent = async (intent) => {
  let transaction;
  try {
    if (!intent) return false;
    transaction = await Transaction.findOne({intent}).populate("productId");
  } catch (e) {
    return false;
  }
  if (transaction) return transaction
  return false;
}

const createTransaction = async (transaction) => {
  let newTransaction;
  transaction = Object.assign(transaction, { status: "pending" });
  try {
    newTransaction = new Transaction(transaction);
    await newTransaction.save();
  } catch (e) {
    console.log(e);
    return false;
  }
  if (newTransaction) return newTransaction;
  return false;
};

module.exports = {
  getAllTransactions,
  getTransactionDetail,
  deleteTransactions,
  changeTransactionStatus,
  getTransactionByUserEmail,
  createTransaction,
  getTransactionByIntent
};
