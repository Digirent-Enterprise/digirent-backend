const {TransactionService} = require("../services");
const {Transaction} = require("../models");


const getALlTransaction = async (req, res) => {
    const found = await TransactionService.getAllTransactions();
    if (!found) return res.sendStatus(404);
    return res.status(200).json(found);
}

const getTransactionByUserEmail = async (req, res) => {
    const {user} = req;
    if (!user) return res.sendStatus(401);
    const found = await TransactionService.getTransactionByUserEmail()
    if (!found) return res.sendStatus(404);
    return res.status(200).json(found)
}

const deleteTransaction = async (req, res) => {
    const {id} = req.body;
    const deletedTransaction = await TransactionService.deleteTransactions(id);
    if (!deletedTransaction) res.sendStatus(404);
    return res.status(200).json(deletedTransaction);
}

const changeTransactionStatus = async (req, res) => {
    const {id, status} = req.body;
    const found = await TransactionService.changeTransactionStatus(id, status)
    if (!found) return res.sendStatus(404);
    return found;
}

const getTransactionDetail = async (req, res) => {
    const { user } = req;
    if (!user) return res.sendStatus(401);
    const {email} = user;
    const {id} = req.body;
    const transaction = await TransactionService.getTransactionDetail(id);
    if (!transaction) return res.sendStatus(404);
    if (transaction.userEmail !== email) return res.sendStatus(403);
    return res.status(200).json(transaction);
}

const createTransaction = async (req, res) => {
    const data = await TransactionService.createTransaction(req.body);
    if (!data) return res.send('Some fields are missing or invalid');
    return data;

}

module.exports = {
    getALlTransaction,
    getTransactionDetail,
    getTransactionByUserEmail,
    deleteTransaction,
    changeTransactionStatus,
    createTransaction
}
