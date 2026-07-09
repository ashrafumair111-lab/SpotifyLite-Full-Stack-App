const mongoose=require('mongoose');


async function connectdb(){

try{

    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully");

}catch(err){
   console.log("database connection error",err);
}

}
module.exports=connectdb;