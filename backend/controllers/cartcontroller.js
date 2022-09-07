const Cart = require('../models/Cart');

//Add Products to the Cart
exports.additem = async(req,res) => {
    const {itemid,userID,quantity,type,total} = req.body;

    try {
        const checkItem = await Cart.findOne({itemid,userID})

        //Checking the Product if already exists
        if(checkItem)
            //If Exists
            return res.status(409).json({message: "Product Already Exists in the Cart"});

        //If Not Exists Add Product
        await Cart.create({itemid,userID,quantity,type,total});
        res.status(200).json({message: "Product Add to the Cart"});

    } catch (error) {
        //If There any Other errors
        res.status(500).json({message: "Product Cannot Added", error: error.message});
    }
}

//View Products in the Cart
exports.viewCart = async(req,res) => {
    //get product id
    let userID = req.params.id;

    try {
        //Find cart by product id and cart
        const cart = await Cart.find({userID}).populate(
            {path:'itemid', select:['name','category','price','description','total','imgUrl']});
        //success message
        res.status(200).json({success: true,result:cart})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching product", error: error.message})
    }
}