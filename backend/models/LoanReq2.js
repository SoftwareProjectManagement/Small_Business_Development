const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const LoanSchemaReq2 = new Schema({      
    name : {
        type : String,
        required : true
    },

    address : {
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

    email : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    incomeReport : {
        type : String,
        required : false
    },

    businessRegistration : {
        type : String,
        required : false
    },

    loanStatus: {
        type : String,
        default: 'Pending'
    }

    
});

const LoanReq2 = mongoose.model("req2",LoanSchemaReq2) 
module.exports = LoanReq2