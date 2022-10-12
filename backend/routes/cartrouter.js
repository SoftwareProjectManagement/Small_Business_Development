const router = require("express").Router();
const {additem, viewCart, updateitem, deleteitem, viewOneCart, viewCart1} = require('../controllers/cartcontroller.js')
const userauth = require('../middleware/userauth');

router.post('/add',userauth, additem);

router.get('/:id', viewCart);

router.get('/view1/:id', viewCart1);

router.put('/update/:id', userauth, updateitem);

router.delete('/delete/:id', deleteitem);

router.get('/view/:id', viewOneCart);

module.exports = router;