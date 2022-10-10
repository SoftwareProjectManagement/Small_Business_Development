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

const UserRouter = require("./routes/userrouter");
const AdminRouter = require("./routes/adminrouter.js");
const RequestRouter = require("./routes/requestrouter.js");
const WorkshopRouter = require("./routes/workshoprouter.js");
const CategoryRouter = require("./routes/categoryrouter.js");
const ProductRouter = require("./routes/productrouter.js");
const CartRouter = require("./routes/cartrouter.js");
const LoanRouter = require("./routes/loanrouter");
const PaymentRouter = require("./routes/paymentrouter");

//getting the database url
const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
})

//database connection
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("db connection success");
});

//when http://localhost:8070/user ran it will execute userrouter.js file
app.use("/user", UserRouter);
//when http://localhost:8070/admin ran it will execute adminrouter.js file
app.use("/admin",AdminRouter);
//when http://localhost:8070/request ran it will execute requestrouter.js file
app.use("/request",RequestRouter);
//when http://localhost:8070/workshop ran it will execute workshoprouter.js file
app.use("/workshop",WorkshopRouter);
//when http://localhost:8070/request ran it will execute requestrouter.js file
app.use("/category",CategoryRouter);

//when http://localhost:8070/product ran it will execute productrouter.js file
app.use("/product",ProductRouter);
//when http://localhost:8070/cart ran it will execute cartrouter.js file
app.use("/cart",CartRouter);
//when http://localhost:8070/payment ran it will execute paymentrouter.js file
app.use("/payment",PaymentRouter);

//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

//running the app in previously defined port
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
