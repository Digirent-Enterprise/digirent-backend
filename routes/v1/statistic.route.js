const statisticController = require("../../controllers/statistic.controller");

const router = require("express").Router();
const upload = require("../../middlewares/uploadImage");
const { authenticateAdmin } = require("../../middlewares/auth");

router.get("/category-percentage", authenticateAdmin ,statisticController.getCategoryPercentage);
router.get("/transaction-status", authenticateAdmin, statisticController.getTransactionsStatistic);
router.get("/monthly-status", authenticateAdmin, statisticController.getRevenue);
router.get("/user-status", authenticateAdmin, statisticController.getUserStatistic);
router.get("/yearly-revenue", authenticateAdmin, statisticController.getRevenueByYear);
router.get("/cats-revenue", authenticateAdmin, statisticController.getRevenueByCats);

module.exports = router;
