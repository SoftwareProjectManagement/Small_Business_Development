const router = require("express").Router();
const {additem, viewCart, updateitem, deleteitem} = require('../controllers/cartcontroller.js')
const userauth = require('../middleware/userauth');

router.post('/add',userauth, additem);

router.get('/:id', viewCart);

router.put('/update/:id', userauth, updateitem);

router.delete('/delete/:id',userauth, deleteitem);

module.exports = router;