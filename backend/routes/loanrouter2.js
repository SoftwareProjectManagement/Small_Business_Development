const router = require("express").Router();
const { addRequest, viewAllRequests, updateLoanRequest } = require('../controllers/loan2controller.js')
 
//add new request
router.post('/add', addRequest);
 
//view all requests
router.get('/',viewAllRequests);

router.put('/:id', updateLoanRequest);

 
module.exports = router;