const {TransactionService, CategoryService, UserService} = require("../services");

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

const getUserStatistic = async (req, res) => {
    const userStatistic = await UserService.getUserStatistic();
    return res.json(userStatistic);
}

const getRevenueByYear = async (req, res) => {
    const revenueByYear = await TransactionService.getRevenueByYear();
    return res.json(revenueByYear)
}

const getRevenueByCats = async (req,res) => {
    const revenueByCats = await TransactionService.getRevenueByCategories();
    return res.json(revenueByCats);
}

module.exports = {
    getTransactionsStatistic,
    getCategoryPercentage,
    getRevenue,
    getUserStatistic,
    getRevenueByYear,
    getRevenueByCats
}
