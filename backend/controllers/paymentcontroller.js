const Payment = require("../models/Payment");

//Add a payment
exports.addPayment = async(req,res) => {
    console.log(req.body);
    const{ userID,date,amount,itemList } = req.body; 

    const newPayment = new Payment({
        //Initializing the Properties of Object
        userID,
        date,
        amount,
        itemList
    });

    //Save the Object to DataBase
    newPayment.save().then(() => {
        res.status(200).json({ status : "New Payment Added Successfully"});
    }).catch((error) => {
        res.status(500).json({message:"Failed to Add the Product", error:error.message})
    })
}

//View Payments
exports.viewPayments = async(req,res) => {
    let userId = req.params.id;

    await Payment.find({ userID : userId }).then((payment) => {
        res.status(200).json({ status : "Product Fetched Successfully", payment});
    }).catch((error) => {
        res.status(500).json({ status : "Error with Fetching the Product", error: error.message});
    });
}