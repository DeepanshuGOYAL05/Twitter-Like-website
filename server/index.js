require("dotenv").config();
const {connectDB} = require("./models/index")
const express= require("express"),
    app= express(),
    cors= require("cors"),
    bodyParser= require("body-parser");

const errorHandler= require("./controllers/error");



//serve static assets in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

// Routes
const routes= require("./routes");

connectDB();

const PORT= 8081;

app.use(cors());
app.use(bodyParser.json());

// all routes
app.use("/", routes);

app.use(function (req,res,next) {
    let err=new Error("Not Found");
    err.status= 404;
    next(err);
});


// error handler
app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`Server starting on PORT ${PORT}`);
});
