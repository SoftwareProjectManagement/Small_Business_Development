const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const sendEmail = require("../utils/sendEmail")

//user sign in controller
exports.usersignin = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password)
        return res.status(400).json({ message: "Please provide an email and password" });

    try {
        //finding user by email
        const user = await User.findOne({ email }).select("+password");

        //if user doesn't exist
        if (!user)
            return res.status(404).json({ message: "User doesn't exist" });

        //compare the provided password with the password in the database
        const ispasswordCorrect = await bcrypt.compare(password, user.password);

        //if passwords don't match
        if (!ispasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        //creating a token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        //sending the user object and token as the response
        res.status(200).json({ success: true, result: user, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}

//user sign up controller
exports.usersignup = async (req, res) => {
    const { firstname, lastname, email, phone, password, imgUrl } = req.body;

    try {
        //checking email already exists
        const checkEmail = await User.findOne({ email })

        if (checkEmail)
            return res.status(409).json({ message: "User with this email already exists" })

        //creating a new user
        const user = await User.create({ firstname, lastname, email, phone, password, imgUrl });

        //creating a token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        //sending the user object and token as the response
        res.status(200).json({ success: true, result: user, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}

//update user controller
exports.updateUser = async (req, res) => {
    let userID = req.params.id;

    const { firstname, lastname, email, phone, imgUrl } = req.body;
    //object with provided data
    const updateUser = {
        firstname, lastname, email, phone, imgUrl
    }

    try {
        //find user by userID and update the user with provided data
        await User.findByIdAndUpdate(userID, updateUser);

        //sending the status message successful
        res.status(200).json({ success: true, message: "Profile updated successfully" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

//delete user controller
exports.deleteUser = async (req, res) => {
    let userID = req.params.id;

    try {
        //find user by userID and delete it
        await User.findByIdAndDelete(userID);

        //sending the status message successful
        res.status(200).json({ success: true, message: "Patient deleted" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

//Forgot Password controller
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        //finding user by email
        const user = await User.findOne({ email });

        //if user doesn't exist
        if (!user)
            return res.status(404).json({ message: "No user with this email" });

        // Reset Token Gen and add to database hashed (private) version of token
        const resetPasswordToken = user.getResetPasswordToken();

        await user.save();

        // Create reset url to email to provided email
        const resetPasswordUrl = `http://localhost:3000/user/passwordreset/${resetPasswordToken}`;

        // HTML Message
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please make a put request to the following link:</p>
            <a href=${resetPasswordUrl} clicktracking=off>${resetPasswordUrl}</a>
        `;

        try {
            //sending the the email
            await sendEmail({ to: user.email, subject: "Password Reset Request", text: message });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (error) {

            //if the email sending failed remove reset token
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            res.status(500).json({ message: "Email could not be sent", error: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

//Reset Password controller
exports.resetPassword = async (req, res) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetPasswordToken).digest("hex");

    try {
        //check whether a user exists with same reset password token and expiration time greater than current time
        const user = await user.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }, });

        if (!user)
            return res.status(400).json({ message: "Invalid Token", error: error.message });

        //saving the new password
        user.password = req.body.password;

        //remove the reset password token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        //creating a token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.status(201).json({ success: true, result: user, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

//fetch users controller
exports.fetchAll = async (req, res) => {

    //calling User model
    User.find().then((user) => {
        res.status(200).json(user)
      }).catch((error) => {
        res.status(500).json({ message: "Error with fetching users", error: error.message });
      })
}

//fetch one user controller
exports.fetchOne = async (req, res) => {
    let userID = req.params.id;

    try {
        //find user with the specific id
        const user = await User.findById(userID);

        res.status(200).json({ success: true, result: user })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}