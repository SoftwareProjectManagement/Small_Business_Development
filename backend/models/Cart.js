const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({

    itemid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product',
        required : true
    },

    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },

    type : {
        type : String,
        required : true
    },

    total : {
        type : Number,
        required : true
    }

});

const Cart = mongoose.model("cart",CartSchema)
module.exports = Cart