const categoryController = require("../../controllers/category.controller");

const router = require("express").Router();
const { authenticateAdmin } = require("../../middlewares/auth");

// add category
router.post("/", authenticateAdmin, categoryController.addCategory);
router.get("/", categoryController.getAllCategories);
router.get("/get-category-products", categoryController.getCategory);

module.exports = router;
