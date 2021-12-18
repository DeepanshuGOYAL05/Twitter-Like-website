    const mongoose= require("mongoose");
// const connectMongoDb = async () => {
    
//     // mongoose.set("debug", true);
//     // mongoose.Promise= Promise;
    
//     await mongoose.connect()
    
//     mongoose.connection.on('connect',() => {
//         console.log("connected successfully")
//     })
// }

const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://ashishbansal:sx6k6q26biWFbdW@cluster0-shard-00-00.dd7nn.mongodb.net:27017,cluster0-shard-00-01.dd7nn.mongodb.net:27017,cluster0-shard-00-02.dd7nn.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-u92eo8-shard-0&authSource=admin&retryWrites=true&w=majority");
      console.log("Data base connected.....");
    } catch (err) {
      console.log(err);
    }
};


// mongoose.connect("mongodb://ashishbansal:sx6k6q26biWFbdW@cluster0-shard-00-00.osobw.mongodb.net:27017,cluster0-shard-00-01.osobw.mongodb.net:27017,cluster0-shard-00-02.osobw.mongodb.net:27017/my_database?ssl=true&replicaSet=atlas-xw3rfy-shard-0&authSource=admin", {
//     keepAlive: true,
// });

// sx6k6q26biWFbdW

module.exports.connectDB = connectDB;
module.exports.User=require("./user");
module.exports.Tweet= require("./tweet");