const categoryController = require("../controllers/category.controller");

const router = require("express").Router();

// add category
router.post("/", categoryController.addCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:name',categoryController.getCategory );

module.exports = router;