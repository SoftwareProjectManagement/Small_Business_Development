const router = require("express").Router();
const {addProduct, viewOneProduct} = require('../controllers/productcontroller.js');

//Add New Product
router.post('/add', addProduct);

//View One Product
router.get('/item/:id', viewOneProduct)

module.exports = router;