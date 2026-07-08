const mongoose=require('mongoose');


const userschema=new mongoose.Schema({

username:{
    type:String,
    unique:true,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true

},
password:{
type:String,
required:true
},
role:{
    type:String,
    enum:['user','artist'],
    default:'user'
}


})
const usermodel=mongoose.model("user",userschema);
module.exports=usermodel;