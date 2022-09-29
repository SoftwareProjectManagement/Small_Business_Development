const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    imgUrl : {
        type : String,
        required : true
    }

});

const Product = mongoose.model("product",ProductSchema);
module.exports = Product;