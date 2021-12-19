// const mongoose= require("mongoose");

// mongoose.set("debug", true);
// mongoose.Promise= Promise;

// mongoose.connect("mongodb://localhost/warbler", {
//     keepAlive: true,
// });

// module.exports.User=require("./user");
// module.exports.Tweet= require("./tweet");


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
      //const DB = 'mongodb://Deepanshu:4SEdaGOTh16zCgK2@cluster0-shard-00-00.dukbn.mongodb.net:27017,cluster0-shard-00-01.dukbn.mongodb.net:27017,cluster0-shard-00-02.dukbn.mongodb.net:27017/TwitterLikeWeb?ssl=true&replicaSet=atlas-rdqfrf-shard-0&authSource=admin&retryWrites=true&w=majority';  
        //const DB='mongodb+srv://Deepanshu:4SEdaGOTh16zCgK2@cluster0.dukbn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
            //await mongoose.connect("mongodb://Deepanshu:4SEdaGOTh16zCgK2@cluster0.rrp7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
           //await mongoose.connect('mongodb://Deepanshu:7T9iWBdv0F8TnvFs@cluster0-shard-00-00.dukbn.mongodb.net:27017,cluster0-shard-00-01.dukbn.mongodb.net:27017,cluster0-shard-00-02.dukbn.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rdqfrf-shard-0&authSource=admin&retryWrites=true&w=majority');
          // await mongoose.connect(DB);
           await mongoose.connect(process.env.MONGO_URL);
  
                 console.log("Data base connected.....");
    } catch (err) {
      console.log(err);
    }
};
//mongodb+srv://Deepanshu:dZUzYSPxYQWbbU5A@cluster0.dukbn.mongodb.net/TwitterLikeWebsite?retryWrites=true&w=majority

//await mongoose.connect("mongodb://ashishbansal:sx6k6q26biWFbdW@cluster0-shard-00-00.dd7nn.mongodb.net:27017,cluster0-shard-00-01.dd7nn.mongodb.net:27017,cluster0-shard-00-02.dd7nn.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-u92eo8-shard-0&authSource=admin&retryWrites=true&w=majority");
     
// mongoose.connect("mongodb://ashishbansal:sx6k6q26biWFbdW@cluster0-shard-00-00.osobw.mongodb.net:27017,cluster0-shard-00-01.osobw.mongodb.net:27017,cluster0-shard-00-02.osobw.mongodb.net:27017/my_database?ssl=true&replicaSet=atlas-xw3rfy-shard-0&authSource=admin", {
//     keepAlive: true,
// });

// sx6k6q26biWFbdW

module.exports.connectDB = connectDB;
module.exports.User=require("./user");
module.exports.Tweet= require("./tweet");