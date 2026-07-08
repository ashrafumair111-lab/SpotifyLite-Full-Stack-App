const express=require('express')
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})
const music=require("../controllers/music.controller")
const authmiddleware=require("../middleware/auth.midolleware")

const router=express.Router();

router.get("/",authmiddleware.authusermiddleware,music.getallmusic)
router.post("/upload",authmiddleware.authartistmiddleware,upload.single("music"),music.createmusic)
router.post("/album",authmiddleware.authartistmiddleware,music.createalbum)

router.get("/albums",authmiddleware.authusermiddleware,music.getallalbums)
router.get("/album/:id",authmiddleware.authusermiddleware,music.getalbumbyid)
module.exports=router