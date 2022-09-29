const router = require("express").Router();
const { addWorkshop, viewAllWorkshop } = require('../controllers/workshopcontroller.js')

//Add New Workshop
router.post('/add', addWorkshop);

//view all Workshops
router.get('/',viewAllWorkshop);

module.exports = router;