const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signIn = async function(req, res, next) {
    // finding a user
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch (e) {
        return next({ status: 400, message: "Invalid Email/Password." });
    }
};

exports.signUp = async function (req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let {id, username, profileImgURL} = user;
        let token = jwt.sign({
            id,
            username,
            profileImgURL
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            username,
            profileImgURL,
            token
        })
    }
    catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry that username or email is already taken";
        }
        return next({
            status: 400,
            message: err.message
        })
    }
};


exports.getUsers=async function(req,res,next)
{
    // console.log("Users"+JSON.stringify(req.body));
  try {
    let users=await db.User.find({ 'username': new RegExp(req.searchTerm, 'i'),
    'email':new RegExp(req.searchTerm,'i') }
   , {email:1,username:1,following:1,followers:1 });

    return res.status(200).json({
        users })
}
catch(err){
    if (err.code === 11000) {
            err.message = "Sorry that username or email is already taken";
        }
        return next({
            status: 400,
            message: err.message
        })
    }
};

exports.follow=async function(req,res,next)
{
    try {
        let followingUser=await db.User.find({email:req.body.followingEmail });
        console.log("Users"+JSON.stringify(req.body));
        // console.log("csv"+JSON.stringify(res));
        let followedUser=await db.User.find({email:req.body.followedEmail  });
        console.log(JSON.stringify(followingUser));
        console.log(JSON.stringify(followedUser));
        //if(followingUser.foll)
        let following = [{
            email: req.followedEmail 
          }] ;    
        //  followingUser.following.push({
        //   email: req.followedEmail 
        // })
       followingUser.following=following;
        // followedUser.followers.push({
        //  email: req.followingEmail});
   
        
        await db.User.update({email:req.followingEmail },{$set:followingUser});
        await db.User.update({email:req.followedEmail},{$set:followedUser});
      
        return res.status(200).json(
            { "message" :"User follwed succesfully" }
           
     )
    }
    catch(err){
        if (err.code === 11000) {
                err.message = "Sorry that username or email is already taken";
            }
            return next({
                status: 400,
                message: err.message
            })

        }

};