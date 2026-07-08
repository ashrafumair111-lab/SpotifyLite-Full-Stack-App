const mongoose=require('mongoose');
const dns = require('dns');
dns.setServers(['192.168.118.1']);
async function connectdb(){

try{

    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully");

}catch(err){
   console.log("database connection error",err);
}

}
module.exports=connectdb;