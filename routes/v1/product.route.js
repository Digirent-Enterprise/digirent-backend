const productController = require('../../controllers/product.controller');

const router = require('express').Router();
const upload = require('../../middlewares/uploadImage');


router.get('/', productController.getAllProducts);
// add products
router.post('/', upload, productController.addProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
