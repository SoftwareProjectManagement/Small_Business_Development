const Category= require("../models/Category");

//add new category
exports.addCategory = async (req, res) => {
 
  //constant variables for the attributes
  const {categoryname,imgUrl} = req.body;
 
  //object
  const newCategory= new Category({
    //initializing properties
    categoryname,
    imgUrl
  })
 
  //saving the object to the db 
  newCategory.save().then(() => {
    res.status(200).json({ status: "New Category Added" });
  }).catch((error) => {
    res.status(500).json({message:"Fail to Add category",error:error.message})
  })
}


//view Product
exports.viewAllCategory = async (req, res) => { 
 
  //calling Product model
  Product.find().then((product) => {
    res.status(200).json(product)
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching Product", error: error.message });
  })
}


