const db = require("../models");
const jwt = require("jsonwebtoken");
const { request } = require("express");

exports.signIn = async function (req, res, next) {
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
        let { id, username, profileImgURL } = user;
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


exports.getUsers = async function (req, res, next) {
    // console.log("Users"+JSON.stringify(req.body));
    try {
        let users = await db.User.find({
            'username': new RegExp(req.searchTerm, 'i'),
            'email': new RegExp(req.searchTerm, 'i')
        }
            , { email: 1, username: 1, following: 1, followers: 1 });

        return res.status(200).json({
            users
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

exports.follow = async function (req, res, next) {
    try {
        let followingUser = await db.User.find({ email: req.body.followingEmail });
        // console.log("Users" + JSON.stringify(req.body));
        // console.log("csv"+JSON.stringify(res));
        let followedUser = await db.User.find({ email: req.body.followedEmail });

        let followingUserObj = { email: req.body.followedEmail };
        let followedUserObj = {email: req.body.followingEmail};
       
   
        let alreadyFollowed = false;

        followingUser[0].followers.forEach(followers => {
            if (followers.email == req.body.followedEmail) {
                alreadyFollowed = true;
                return;
            }
        });

        if (alreadyFollowed) {
            return res.status(500).json(
                { "message": "ALready followerd" }
             );
            //onsole.log("message: ALready followed");
        
           
        }
 
        else {
            console.log("*************************************")

            await db.User.findOneAndUpdate(
                { email: req.body.followingEmail },
                { $push: { followers: followingUserObj } },
                null,
                function (err, docs) {
                    console.log("----Update docs----" + docs)
                    if (err) {
                        console.log(err)
                         return res.status(500).json(
                             { "message": "ISE" }
                         );

                    } else {

                         return res.status(200).json(
                             { "message": "User successfully followed" }
                         );
                    }
                }
            )
        }

        let alreadyFollowing = false;

        followedUser[0].followers.forEach(followers => {
            if (followers.email == req.body.followingEmail) {
                alreadyFollowing = true;
                // return;
            }
        });

        if (alreadyFollowing) {
            // return res.status(500).json(
            //     { "message": "ALready following" }
            // );
        } else {
            console.log("///////////*")

            await db.User.findOneAndUpdate(
                { email: req.body.followedEmail },
                { $push: { followers: followedUserObj } },
                null,
                function (err, doc) {
                    console.log("----Update docs----" + doc)
                    if (err) {
                        // console.log(err)
                        // return res.status(500).json(
                        //     { "message": "ISE" }
                        // );

                    } else {

                        // return res.status(200).json(
                        //     { "message": "User successfully following" }
                        // );
                    }
                }
            )
        

    }

  
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