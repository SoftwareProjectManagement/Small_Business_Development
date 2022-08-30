const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

app.use(express.static('public'));
//limiting image size to 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const StaffRouter = require("./routes/staffrouter");
const DocumentRouter = require("./routes/documentrouter");
const AdminRouter = require("./routes/adminrouter.js");
const StudentRouter = require("./routes/studentrouter");
const RequestRouter = require("./routes/requestrouter");
const TopicRouter = require("./routes/topicrouter");








const VideoRouter = require("./routes/videorouter");
const markingSchemeRouter = require("./routes/markingSchemeRouter")
const evaluationMarksRouter = require("./routes/evaluationMarksRouter")
const submissionTypeRouter = require("./routes/SubmissionTypeRouter")
const GroupRouter = require("./routes/grouprouter")

//getting the database url
const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL,{
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
})

//database connection
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("db connection success");
}); 

//when http://localhost:8070/student ran it will execute studentrouter.js file
app.use("/student",StudentRouter);
//when http://localhost:8070/staff ran it will execute staffrouter.js file
app.use("/staff",StaffRouter);
//when http://localhost:8070/tdoc ran it will execute documentrouter.js file
app.use("/tdoc",DocumentRouter);
//when http://localhost:8070/admin ran it will execute adminrouter.js file
app.use("/admin",AdminRouter);
//when http://localhost:8070/request ran it will execute requestrouter.js file
app.use("/request",RequestRouter);
//when http://localhost:8070/topic ran it will execute topicrouter.js file
app.use("/topic",TopicRouter);
















//when http://localhost:8070/submissionVideo ran it will execute videorouter.js file
app.use("/submissionVideo",VideoRouter);
//when http://localhost:8070/markingScheme ran it will execute markingSchemeRouter.js file
app.use("/markingScheme",markingSchemeRouter);
//when http://localhost:8070/evaluationMarks ran it will execute evaluationMarksRouter.js file
app.use("/evaluationMarks",evaluationMarksRouter);
//when http://localhost:8070/submissionType ran it will execute submissionTypeRouter.js file
app.use("/submissionType",submissionTypeRouter);
//when http://localhost:8070/groups ran it will execute grouprouter.js file
app.use("/groups",GroupRouter);




//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

//running the app in previously defined port
const server = app.listen(PORT,() =>{
    console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
