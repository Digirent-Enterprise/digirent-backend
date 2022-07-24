const productController = require('../../controllers/product.controller');

const router = require('express').Router();
const upload = require('../middleware/uploadImage');


// add products
router.post('/', upload, productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
