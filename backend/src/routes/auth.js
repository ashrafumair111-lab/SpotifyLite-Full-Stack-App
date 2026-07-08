const express=require('express');
const router=express.Router();
const authcontroller=require("../controllers/auth.controller")


router.post("/register",authcontroller.register)
router.post("/loginuser",authcontroller.loginuser)
router.post("/logout",authcontroller.logout)





module.exports=router;