const musicmodel=require("../models/music.model")
const jwtss=require('jsonwebtoken')
const {uploadfile}=require("../services/storage.service")
const albummodel=require('../models/album.model')

async function createmusic(req,res){

  
    const {title}=req.body;
    const file=req.file;
    const result=await uploadfile(file.buffer.toString("base64"))
    const music=await musicmodel.create({
        uri:result.url,
        title,
        artist:req.user.id
    })
res.status(201).json({
    message: "Music created successfully",
    music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
    }
})


 


}

async function createalbum(req,res) {
   
        const {title,musicsid}=req.body;
        const album=await albummodel.create({
            title,
            artist:req.user.id,
            musics:musicsid
        })
        res.status(201).json({
            message:"album created successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics

            }
        })


    

}



async function getallmusic(req,res) {
    const musics=await musicmodel.find().limit(20).populate("artist","username")
    const formattedMusics = musics.map(music => ({
        id: music._id,
        title: music.title,
        uri: music.uri,
        artist: music.artist ? music.artist.username : "unknown"
    }))
    res.status(200).json({
        message:"all music fetched successfully",
        musics:formattedMusics
    })
}

async function getallalbums(req,res) {
    const albums=await albummodel.find().populate("artist","username email")
    const formattedAlbums = albums.map(album => ({
        id: album._id,
        title: album.title,
        artist: album.artist ? { name: album.artist.username, email: album.artist.email } : "unknown"
    }))
    res.status(200).json({
        message:"all albums fetched successfully",
        albums:formattedAlbums
    })
}

async function getalbumbyid(req,res) {
    const {id}=req.params;
    const album=await albummodel.findById(id).populate("artist","username email").populate("musics","title uri")
    if(!album){
        return res.status(404).json({
            message:"album not found"
        })
    }
    res.status(200).json({
        message:"album fetched successfully",
        album:{
            id: album._id,
            title: album.title,
            artist: album.artist ? { name: album.artist.username, email: album.artist.email } : "unknown",
            musics: album.musics
        }
    })
}

module.exports={createmusic,createalbum,getallmusic,getallalbums,getalbumbyid}