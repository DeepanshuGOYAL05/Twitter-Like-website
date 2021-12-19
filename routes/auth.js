const express= require("express");
const router= express.Router();
const {signUp, signIn,getUsers,follow,userData}= require("../controllers/auth");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/users", getUsers);
router.post("/follow", follow);
router.get("userData",userData);

module.exports= router;