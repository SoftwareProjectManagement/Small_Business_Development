const router = require("express").Router();
const {additem} = require('../controllers/cartcontroller.js')
const userauth = require('../middleware/userauth');

router.post('/add',userauth, additem);

module.exports = router;