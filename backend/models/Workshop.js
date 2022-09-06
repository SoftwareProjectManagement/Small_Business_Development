const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//workshop Schema to to store workshop details
const WorkshopSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    videoUrl : {
        type : String,
        required : true
    }
});

const Workshop = mongoose.model("workshop",WorkshopSchema);
module.exports = Workshop;