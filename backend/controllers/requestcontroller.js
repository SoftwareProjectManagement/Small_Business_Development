const router = require("express").Router();
let Request = require("../models/Request");

//add new doc
exports.addRequest = async (req, res) => {
 
    //constant variables for the attributes
    const {name,address,mobile,email,nic,proof,reg} = req.body;
   
    //object
    const newRequest= new Request({
      name,
      address,
      mobile,
      email,
      nic,
      proof,
      reg
    })
   
    //saving the object to the db 
    newRequest.save().then(() => {
      res.status(200).json({ status: "New Request Added" });
    }).catch((error) => {
      res.status(500).json({message:"Fail to Add Item",error:error.message})
    })
  }
  
  
  //view Request
  exports.viewAllRequest = async (req, res) => { 
   
    //calling Request model
    Request.find().then((request) => {
      res.status(200).json(request)
    }).catch((error) => {
      res.status(500).json({ message: "Error with fetching requests", error: error.message });
    })
  }
   

  exports.updateRequest = async(req,res) => {

    let requestID = req.params.id;
    const { jstatus } = req.body;


    const updateRequest= { jstatus } 
    
    try{
        //find topic by ID  
         await Request.findByIdAndUpdate(requestID ,updateRequest);

        res.status(200).json({message:"request updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating data",error:error.message});
    }

}

exports.deleteSeller = async (req, res) => {
  let sellerID = req.params.id;

  try {
      //find seller by sellerID and delete it
      await Request.findByIdAndDelete(sellerID);

      //sending the status message successful
      res.status(200).json({ success: true, message: "Seller deleted" })
  } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
  
  
  