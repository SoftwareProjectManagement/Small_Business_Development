const router = require("express").Router();
const { addCategory,viewAllCategory} = require('../controllers/categorycontroller')
 
//add new category
router.post('/add', addCategory);

//view all category
router.get('/',viewAllCategory);
 
module.exports = router;