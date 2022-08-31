const router = require("express").Router();
const { addCategory} = require('../controllers/categorycontroller')
 
//add new product
router.post('/add', addCategory);
 
module.exports = router;