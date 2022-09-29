const router = require("express").Router();
const {addProduct, viewOneProduct,viewAllProducts} = require('../controllers/productcontroller.js');

//Add New Product
router.post('/add', addProduct);

//View One Product
router.get('/item/:id', viewOneProduct)

//view all products
router.get('/',viewAllProducts);

module.exports = router;