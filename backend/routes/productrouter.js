const router = require("express").Router();
const {addProduct, viewOneProduct,viewAllProducts,deleteProduct,updateProduct} = require('../controllers/productcontroller.js');

//Add New Product
router.post('/add', addProduct);

//View One Product
router.get('/item/:id', viewOneProduct)

//view all products
router.get('/',viewAllProducts);

//delete existing product
router.delete('/delete/:id', deleteProduct);

//update product
router.put('/update/:id', updateProduct);

module.exports = router;