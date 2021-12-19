const express= require("express");
const router= express.Router();
const {signUp, signIn,getUsers,follow}= require("../controllers/auth");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/users", getUsers);
router.post("/follow", follow);


module.exports= router;