const router = require("express").Router();
const { addRequest, viewRequest , updateRequest} = require('../controllers/requestcontroller.js')
const { viewOneRequest } = require('../controllers/requestcontroller.js')

//add new Request
router.post('/add', addRequest);

//view Request
router.get('/show', viewRequest);

//view one Request
router.get('/view/:id', viewOneRequest);

router.put('/show/:id', updateRequest);

module.exports = router;