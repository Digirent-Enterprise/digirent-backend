const transactionController = require('../../controllers/transaction.controller');

const {authenticateAdmin, authenticateToken} = require('../../middlewares/auth')

const router = require('express').Router();

router.get('/', authenticateAdmin ,(req,res) => transactionController.getALlTransaction(req,res));
router.get('/transaction-detail', authenticateToken, (req, res) => transactionController.getTransactionDetail(req,res));
router.delete('/delete-transaction', authenticateAdmin, (req, res) => transactionController.deleteTransaction(req,res));
router.put('/change-transaction-status', authenticateAdmin, (req, res) => transactionController.changeTransactionStatus(req,res));
router.post('/transactions', authenticateToken, (req,res)=> transactionController.getTransactionByUserEmail(req, res));
router.post('/create-transaction', authenticateAdmin, (req,res)=> transactionController.createTransaction(req, res));

module.exports = router;
