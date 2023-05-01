import express from "express"
import mutler from "multer"
import mongoose from "mongoose"
import {registerValidatior, loginValidator, createPostValidator} from "./validations/auth.js"
import {login, getMe, registration } from "./controllers/userController.js"
import {getOnePost, getAllPosts, createNewPost, deletePost, updatePost} from "./controllers/postController.js"
import checkAuth from "./utils/checkAuth.js"

mongoose.connect('mongodb+srv://zheka:1111@cluster0.ph7oomf.mongodb.net/blog')
.then(()=> console.log("DB OK"))
.catch((err)=> console.log("DB ERROR", err))

const app = express()



const storage = mutler.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
        // cb(null, "aploads") crete dist where will storage for picture  
    },
    
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
})

app.use('upload', express.static('uploads'))
//app.use('upload', express.static('uploads')) help load image in front 
//express.static('uploads') указывает на папку в которой искать картинку
const upload = mutler({storage})

app.use(express.json())

app.listen(5000, (err)=>{
    if(err){
        return console.log(err)
    }
    
    console.log("SERVER OK")
    })

app.post("/auth/login", loginValidator, login)

app.get("/auth/me", checkAuth, getMe)

app.post("/auth/register", registerValidatior, registration)

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/upload/${req.file.originalname}`
    })
})
app.get("/posts", getAllPosts)
app.get("/posts/:id", getOnePost)
app.post("/posts", checkAuth, createPostValidator, createNewPost)
app.delete("/posts/:id", checkAuth, deletePost)
app.patch("/posts/:id",  checkAuth, updatePost)

