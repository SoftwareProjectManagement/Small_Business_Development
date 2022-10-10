const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const PaymentSchema=new Schema({
    
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    date:{
        type : String,
        required : true
    },

    amount:{
        type:Number,
        required: true
    },

    itemList:{
        type : Array,
        required : false
    }
    

})

const Payment=mongoose.model("payment",PaymentSchema);
module.exports=Payment;