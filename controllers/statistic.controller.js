const {TransactionService, CategoryService} = require("../services");

const getTransactionsStatistic = async (req, res) => {
    const statistic = await TransactionService.getTransactionsStatistic()
    return res.json(statistic);
}

const getRevenue = async (req, res) => {
    const revenue = await TransactionService.getRevenueByMonth();
    return res.json(revenue);
}


const getCategoryPercentage = async (req,res) => {
    const statistic = await CategoryService.getCategoryStatistic();
    return res.json(statistic);
}

module.exports = {
    getTransactionsStatistic,
    getCategoryPercentage,
    getRevenue
}
