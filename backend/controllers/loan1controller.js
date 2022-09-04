const LoanReq1 = require("../models/LoanReq1");

//add new doc
exports.addRequest = async (req, res) => {
 
    //constant variables for the attributes
    const {name,address,nic,mobile,sellerID,description} = req.body;
   
    //object
    const newRequest= new LoanReq1({
      name,
      address,
      nic,
      mobile,
      sellerID,
      description
    })
   
    //saving the object to the db 
    newRequest.save().then(() => {
      res.status(200).json({ status: "New Loan Added" });
    }).catch((error) => {
      res.status(500).json({message:"Fail to send request",error:error.message})
    })
  }
  
  
  //view Requests
  exports.viewAllRequests = async (req, res) => { 
   
    //calling model
    LoanReq1.find().then((request) => {
      res.status(200).json(request)
    }).catch((error) => {
      res.status(500).json({ message: "Error with fetching details", error: error.message });
    })
  }
   

  exports.updateRequests = async(req,res) => {

    let requestID = req.params.id;
    const { tstatus } = req.body;


    const updateRequest= { tstatus } 
    
    try{
        //find request by ID  
         await LoanReq1.findByIdAndUpdate(requestID ,updateTopic);

        res.status(200).json({message:"request updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating details",error:error.message});
    }

}
  
  
  