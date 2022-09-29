const Workshop = require("../models/Workshop");

//Add a new Workshop to the DataBase
exports.addWorkshop = async (req, res) => {

    //Define Constant Variables for the attributes
    const {title, description,videoUrl} = req.body;

    //Create New Object
    const newWorkshop = new Workshop({
        //Initializing the Properties of Object
        title,
        description,
        videoUrl
    })

    //Save the Object to DataBase
    newWorkshop.save().then(() => {
        res.status(200).json({ status : "New Workshop Added Successfully"});
    }).catch((error) => {
        res.status(500).json({message:"Failed to Add the Workshop", error:error.message})
    })
}

//view Workshops
exports.viewAllWorkshop = async (req, res) => { 
    //Calling Workshop model
    Workshop.find().then((workshop) => {
      res.status(200).json(workshop)
    }).catch((error) => {
      res.status(500).json({ message: "Error with fetching Product", error: error.message });
    })
  }