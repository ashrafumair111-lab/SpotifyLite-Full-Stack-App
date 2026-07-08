const {ImageKit}=require("@imagekit/nodejs")




const  imagekitclient=new ImageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY,

})
async function uploadfile(file){
  const result=await imagekitclient.files.upload({
    file,
    fileName:"music_"+Date.now(),
    folder:"spotify-mern-authentication/music"

  })
  return result;
}
module.exports={uploadfile}