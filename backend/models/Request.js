const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const RequestSchema = new Schema({      
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

    reg : {
        type : String,
        required : true
    },

    proof : {
        type : String,
        required : true
    },

    jstatus: {
        type : String,
        default: 'In progress'
    }

    
});

const Request = mongoose.model("request",RequestSchema) 
module.exports = Request