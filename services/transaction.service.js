const {Transaction, Product} = require("../models");

const getAllTransactions = async () => {
    const transactions = await Transaction.find();
    if (transactions) return transactions;
    return false;
}

const getTransactionByUserEmail = async (email) => {
    console.log('email ', email)
    const transactions = await Transaction.find({userEmail: email});
    if (transactions) return transactions;
    return false;
}

const changeTransactionStatus = async (transactionId, status) => {
    let transaction;
    try {
        transaction = await Transaction.findOneAndUpdate({_id: transactionId}, {...status});
    } catch (e) {
        return false;
    }
    if (transaction) return transaction;
    return false;
}

const deleteTransactions = async (transactionId) => {
    let transaction;
    try {
        transaction = await Transaction.findOneAndDelete({_id: transactionId});
    } catch (e) {
        return false;
    }
    if (transaction) return transaction;
    return false;
}

const getTransactionDetail = async (transactionId) => {
    let transaction;
    try {
        transaction = await Transaction.findOne({_id: transactionId});
    } catch (e) {
        if (e) return false;
    }
    if (transaction) return transaction;
    return false;
}

const createTransaction = async (transaction) => {
    let newTransaction;
    transaction = Object.assign(transaction, {status: 'pending'});
    console.log(transaction)
    try {
        newTransaction = new Transaction(transaction);
        await newTransaction.save()
    } catch (e) {
        console.log(e);
        return false;
    }
    if (newTransaction) return newTransaction;
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
