const Product = require("../models/Product");

//Add a new Product to the DataBase
exports.addProduct = async (req, res) => {

    //Define Constant Variables for the attributes
    const {name, category, price, description, imgUrl} = req.body;

    //Create New Object
    const newProduct = new Product({
        //Initializing the Properties of Object
        name,
        category,
        price,
        description,
        imgUrl
    });

    //Save the Object to DataBase
    newProduct.save().then(() => {
        res.status(200).json({ status : "New Product Added Successfully"});
    }).catch((error) => {
        res.status(500).json({message:"Failed to Add the Product", error:error.message})
    })
}

exports.viewOneProduct = async (req, res) => {
    let productId = req.params.id;

    await Product.findById(productId).then((product) => {
        res.status(200).json({ status : "Product Fetched Successfully", product});
    }).catch((error) => {
        res.status(500).json({ status : "Error with Fetching the Product", error: error.message});
    });
}

//view Product
exports.viewAllProducts = async (req, res) => { 
 
    //calling Product model
    Product.find().then((product) => {
      res.status(200).json(product)
    }).catch((error) => {
      res.status(500).json({ message: "Error with fetching Product", error: error.message });
    })
  }