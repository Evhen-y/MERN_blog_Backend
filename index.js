import express from "express"
import mongoose from "mongoose"
import {registerValidatior, loginValidator, createPostValidator} from "./validations/auth.js"
import {login, getMe, registration } from "./controllers/userController.js"
import {getOnePost, getAllPosts, createNewPost} from "./controllers/postController.js"
import checkAuth from "./utils/checkAuth.js"

mongoose.connect('mongodb+srv://zheka:1111@cluster0.ph7oomf.mongodb.net/blog')
.then(()=> console.log("DB OK"))
.catch((err)=> console.log("DB ERROR", err))

const app = express()
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

app.get("/posts", getAllPosts)
app.get("/posts/:id", getOnePost)
app.post("/posts", checkAuth, createPostValidator, createNewPost)
// app.delete("/posts/:id", deletePost)
// app.patch("/posts/:id", updatePost)

