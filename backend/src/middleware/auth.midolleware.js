const jwt =require('jsonwebtoken')




async function authusermiddleware(req,res,next){
const token=req.cookies.token;
 if (!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
      try{
    
            const decoded=jwt.verify(token,process.env.jwts)
            if(decoded.role!=="user"){
                 return res.status(403).json({
                message:"only users can access"
            })
            }
            req.user=decoded;
            next();

}catch(err){
    console.log(err);
    return res.status(401).json({
        message:"unauthorized"
    })

}
}

async function authartistmiddleware(req,res,next){
const token=req.cookies.token;
 if (!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
      try{
    
            const decoded=jwt.verify(token,process.env.jwts)
            if(decoded.role!=="artist"){
                 return res.status(403).json({
                message:"you are not artist"
            })
            }
            req.user=decoded;
            next();

}catch(err){
    console.log(err);
    return res.status(401).json({
        message:"unauthorized"
    })

}
}
module.exports={authartistmiddleware,authusermiddleware}