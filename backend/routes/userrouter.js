const router = require("express").Router();
const userauth = require('../middleware/userauth');
const { usersignup, usersignin, updateUser, deleteUser} = require('../controllers/usercontroller.js');
const { forgotPassword, resetPassword, fetchAll, fetchOne} = require('../controllers/usercontroller.js')

//user sign up
router.post('/signup', usersignup);

//user sign in
router.post('/signin', usersignin);

//user update profile
router.put('/updateprofile/:id', userauth, updateUser);

//user delete profile
router.delete('/deleteprofile/:id', userauth, deleteUser);

//user forgotPassword
router.post('/forgotpassword', forgotPassword);

//user resetPassword
router.put('/resetpassword/:resetPasswordToken', resetPassword);

//find all users
router.get('/', fetchAll);

//find one user
router.get('/:id', fetchOne);


module.exports = router;