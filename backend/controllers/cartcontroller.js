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

//Update Products in the Cart
exports.updateitem = async(req,res) => {
    //get cart id
    let cartId = req.params.id;

    const quantity = Number(req.body.quantity);
    const Price = Number(req.body.price);

    let total = Price * quantity;

    const updateCart = {quantity,total}
    
    try {
        //Find a product by ID for update
        await Cart.findByIdAndUpdate(cartId,updateCart);
        //Success message
        res.status(200).json({success: true,message:"Quantity Updated"})

    }catch(error){
        //Error message
        res.status(500).json({message: "failed to update", error: error.message})
    }
}

//Delete Products in the Cart
exports.deleteitem = async(req,res) => {
    //get cart id
    let cartId = req.params.id;

    try {
        //Find a product by ID for delete
        await Cart.findByIdAndDelete(cartId);
        //Success message
        res.status(200).json({success: true,message:"Item Deleted"})
    }catch(error){
        //Error message
        res.status(500).json({message: "failed to delete", error: error.message})
    }
}