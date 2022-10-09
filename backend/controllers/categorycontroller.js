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


//view Category
exports.viewAllCategory = async (req, res) => { 
 
  //calling Category model
  Category.find().then((category) => {
    res.status(200).json(category)
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching Category", error: error.message });
  })
}

//view one category
exports.viewOneCategory = async (req, res) => {
  let CategoryId = req.params.id;

  await Category.findById(CategoryId).then((category) => {
    res.status(200).json({ status: "Category fetched", category });
  }).catch((error) => {
    res.status(500).json({ status: "Error with fetching Category", error: error.message });
  })
}




