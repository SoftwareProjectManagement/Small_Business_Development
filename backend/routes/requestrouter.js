const router = require("express").Router();
const { addRequest, viewAllRequest, updateRequest, deleteSeller } = require('../controllers/requestcontroller.js')
 
//add new request
router.post('/add', addRequest);
 
//view all requests
router.get('/',viewAllRequest);

router.put('/:id', updateRequest);

router.delete('/:id', deleteSeller);

 
module.exports = router;