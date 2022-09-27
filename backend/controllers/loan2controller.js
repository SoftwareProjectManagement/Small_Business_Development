const LoanReq2 = require("../models/LoanReq2");

//add new doc
exports.addRequest = async (req, res) => {
 
    //constant variables for the attributes
    const {name,address,nic,mobile,email,description,incomeReport,businessRegistration,loanStatus} = req.body;
   
    //object
    const newLoanRequest= new LoanReq2({
      name,
      address,
      nic,
      mobile,
      email,
      description,
      incomeReport,
      businessRegistration,
      loanStatus
    })
   
    //saving the object to the db 
    newLoanRequest.save().then(() => {
      res.status(200).json({ status: "New Loan Request Added Successfully!" });
    }).catch((error) => {
      res.status(500).json({message:"Fail to send request",error:error.message})
    })
  }
  
  
  //view Requests
  exports.viewAllRequests = async (req, res) => { 
   
    //calling model
    LoanReq2.find().then((request) => {
      res.status(200).json(request)
    }).catch((error) => {
      res.status(500).json({ message: "Error with fetching details", error: error.message });
    })
  }
   

  exports.updateLoanRequest = async(req,res) => {

    let loanID = req.params.id;
    const { loanStatus } = req.body;


    const updateLoanReq= { loanStatus } 
    
    try{
        //find request by ID  
        await LoanReq2.findByIdAndUpdate(loanID ,updateLoanReq);

        res.status(200).json({message:"Request Updated"})
    }catch(error){
        res.status(500).json({message:"Error With Updating Details",error:error.message});
    }

}
  
  
  