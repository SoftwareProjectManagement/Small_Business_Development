const router = require("express").Router();
let Request = require("../models/Request");

//add new Request
exports.addRequest = async (req, res) => {
  //constant variables for attributes
  const {userID, address, nic, bussinessID,proof} = req.body;

  //object
  const newRequest = new Request({
    //initializing properties
    userID,
    address,
    nic,
    bussinessID,
    proof,
  
  })

  //exception handling
  newRequest.save().then(() => {
    //saving the object to the db
    res.status(200).json({ success: true, message: "Request was created" })
  }).catch((error) => {
    res.status(500).json({ success: false, message: "Creating Request failed", error: error.message })
  })
}


//view Request
exports.viewRequest = async (req, res) => { 
 
  //calling request model
  Request.find().then((request) => {
    res.status(200).json(request)
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching all requests", error: error.message });
  })
}

//view one Request
exports.viewOneRequest = async (req, res) => {
  let requestID = req.params.id;

    await Request.findById(requestID).populate(
      { path: 'userID', select: ['firstname', 'lastname', 'email',  'phone'] }).then((request) => {
        res.status(200).json({success: true, result:request});
    }).catch((error) =>{
        res.status(500).json({success:false, status: "Fetching Request failed", error: error.message });
    })
}

exports.updateRequest = async(req,res) => {

  let requestID = req.params.id;
  const { rstatus } = req.body;


  const updateRequest= { rstatus } 
  
  try{
      //find Request by ID  
       await Request.findByIdAndUpdate(requestID ,updateRequest);

      res.status(200).json({message:"request updated"})
  }catch(error){
      res.status(500).json({message:"Error with updating data",error:error.message});
  }

}




