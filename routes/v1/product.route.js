const productController = require('../../controllers/product.controller');

const router = require('express').Router();
const upload = require('../../middlewares/uploadImage');
const {authenticateAdmin} = require("../../middlewares/auth");


router.get('/', productController.getAllProducts);
// add products
router.post('/', upload, productController.addProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', authenticateAdmin, productController.updateProduct);
router.delete('/:id', authenticateAdmin, productController.deleteProduct);

module.exports = router;
