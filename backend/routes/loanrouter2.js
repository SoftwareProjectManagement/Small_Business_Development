const router = require("express").Router();
const { addRequest, viewAllRequests, updateLoanRequest, deleteRequest } = require('../controllers/loan2controller.js')

//add new request
router.post('/add', addRequest);

//view all requests
router.get('/',viewAllRequests);

// update request
router.put('/:id', updateLoanRequest);

//delete request
router.delete('/delete/:id', deleteRequest);
 
module.exports = router;