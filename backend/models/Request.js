const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  address: {
    type: String,
    required: true
  },

  nic: {
    type: String,
    required: true
  },

  bussinessID: {
    type: String,
    required: true
  },

  proof: {
    type: String,
    required: true
  },

  rstatus: {
    type: String,
    default: "Pending"
  }


});

const Request = mongoose.model("request", RequestSchema)
module.exports = Request