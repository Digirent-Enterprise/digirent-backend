const {Transaction} = require("../models");

const getAllTransactions = async () => {
    const transactions = await Transaction.find();
    if (transactions) return transactions;
    return false;
}

const getTransactionByUserEmail = async (email) => {
    const transactions = await Transaction.find({userEmail: email});
    if (transactions) return transactions;
    return false;
}

const changeTransactionStatus = async (transactionId, status) => {
    const transaction = await Transaction.findOneAndUpdate({_id: transactionId}, {status});
    if (transaction) return transaction;
    return false;
}

const deleteTransactions = async (transactionId) => {
    const transaction = await Transaction.findOneAndDelete({_id: transactionId});
    if (transaction) return transaction;
    return false;
}

const getTransactionDetail = async (transactionId) => {
    const transaction = await Transaction.findOne({_id: transactionId});
    if (transaction) return transaction;
    return false;
}

const createTransaction = async (transaction) => {
    const data = await new Transaction(transaction).save();
    if (data) return data;
    return false;
}

module.exports = {
    getAllTransactions,
    getTransactionDetail,
    deleteTransactions,
    changeTransactionStatus,
    getTransactionByUserEmail,
    createTransaction
}
