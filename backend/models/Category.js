const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const ProductCategory = new Schema({      
    categoryname: {
        type : String,
        required : true
    },
    imgUrl: {
        type: String,
        required: false
    },
    
});

const Category = mongoose.model("productcategory",ProductCategory) 
module.exports = Category