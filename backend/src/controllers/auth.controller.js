const usermodel=require("../models/user.model")
const jsonwebtoken=require("jsonwebtoken")
const bcryptjs=require('bcryptjs')




async function register(req,res){
    const {username,email,password,role="user"}=req.body;
    const isuserexist=await usermodel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })
    if(isuserexist){
        return res.status(409).json({message:"user already exist"})
    }
    const hash=await bcryptjs.hash(password,10)
   const newuser=await usermodel.create({
    username:username,
    email:email,
    password:hash,
    role:role,


   })
   const token=jsonwebtoken.sign({
    id:newuser._id,
    role:newuser.role
   },process.env.jwts)
   res.cookie("token",token);
   res.status(201).json({
    message:"successfully registered",
    newuser:{
        id:newuser._id,
        username:newuser.username,
        email:newuser.email,
        
        role:newuser.role
    }
   })
}
async function loginuser(req,res){
    const {username,email,password}= req.body;
    const user=await usermodel.findOne({
        $or:[
            {username:username},
            {email:email}
    ]
    })
    if(!user){
        return res.status(401).json({
            message:"invalid cradentials"
        })
    }
    const ispassowrdvalid=await bcryptjs.compare(password,user.password)
    if(!ispassowrdvalid){
       return res.status(401).json({
        message:"password is wrong"
       })
    }
    const token=jsonwebtoken.sign({
        id:user._id,
        role:user.role
    },process.env.jwts)
    res.cookie("token",token)
res.status(200).json({
    message:"login successfull",
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role

    }
})


}
async function logout(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"logout successfully"
    })
}
module.exports={register,loginuser,logout}