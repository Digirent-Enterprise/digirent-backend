const { Transaction, Product } = require("../models");

const getAllTransactions = async () => {
  const transactions = await Transaction.find().populate("productId");
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
    console.log("statusssssss", status);
    if (status.productId && status.status && status.status === "paid") {
      await Product.findOneAndUpdate(
        { _id: status.productId },
        { status: false },
      );
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
    transaction = await Transaction.findOne({ _id: transactionId }).populate(
      "productId",
    );
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
    transaction = await Transaction.findOne({ intent }).populate("productId");
  } catch (e) {
    return false;
  }
  if (transaction) return transaction;
  return false;
};

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

const getTransactionExcludeIntervals = async (id) => {
  const transactions = await Transaction.find({ productId: id });
  if (transactions && transactions.length) {
    return transactions.map((transaction) => {
      return {
        start: transaction.from,
        end: transaction.to,
      };
    });
  }
  return [];
};

const getTransactionsStatistic = async () => {
  const pending = await Transaction.find().count({status: 'pending'});
  const paid = await Transaction.find().count({status: 'paid'});
  if (!pending && !paid) return false;
  return  {
    pending, paid
  }
};

const getRevenueByMonth = async () => {
  const now = new Date();
  const oneMonthAgo = now.setMonth(now.getMonth() - 1);
  const oneMonthData = await Transaction.find({createdAt: {$gte:oneMonthAgo, $lt:now}, status: 'paid'});
  const newObject = {}
  const revenueByDate = oneMonthData.map(data => {
    const transactionDay = new Date(Number(data.createdAt));
    const transactionDate = transactionDay.getDate();
    const transactionMonth = transactionDay.getMonth() + 1;
    if (!newObject[`${transactionDate}/${transactionMonth}`]){
      newObject[`${transactionDate}/${transactionMonth}`] = data.rentalCost + data.deposit + data.latePenalty;
    } else {
      newObject[`${transactionDate}/${transactionMonth}`] += data.rentalCost + data.deposit + data.latePenalty;
    }
  })
  return newObject
}

module.exports = {
  getAllTransactions,
  getTransactionDetail,
  deleteTransactions,
  changeTransactionStatus,
  getTransactionByUserEmail,
  createTransaction,
  getTransactionByIntent,
  getTransactionExcludeIntervals,
  getTransactionsStatistic,
  getRevenueByMonth
};
