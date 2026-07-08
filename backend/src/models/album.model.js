const mongoose =require("mongoose")




const albumschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    musics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"music"
    }],
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        req:true
    }

})
const albummodel=mongoose.model("album",albumschema)

module.exports=albummodel