const router = require("express").Router();
const {additem,viewCart} = require('../controllers/cartcontroller.js')
const userauth = require('../middleware/userauth');

router.post('/add',userauth, additem);

router.get('/:id', viewCart);

module.exports = router;