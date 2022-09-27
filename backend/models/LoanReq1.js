const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const LoanSchemaReq1 = new Schema({      
    name : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },
    
    nic : {
        type : String,
        required : true
    },

    mobile : {
        type : String,
        required : true
    },

    sellerID : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    tstatus: {
        type : String,
        default: 'Pending'
    }

    
});

const LoanReq1 = mongoose.model("req1",LoanSchemaReq1) 
module.exports = LoanReq1