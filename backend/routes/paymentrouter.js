const router = require("express").Router();

const{ addPayment, viewPayments  }=require('../controllers/paymentcontroller.js');

router.post('/add', addPayment);
router.get('/viewPayments/:id', viewPayments);

module.exports =router;