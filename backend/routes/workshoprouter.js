const router = require("express").Router();
const { addWorkshop } = require('../controllers/workshopcontroller.js')

//Add New Worksshop
router.post('/add', addWorkshop);

module.exports = router;