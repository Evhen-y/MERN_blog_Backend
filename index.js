import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {registerValidatior} from "./validations/auth.js"
import {validationResult} from "express-validator"
import UserModel from "./model/User.js"
import bcrypt from "bcrypt"

mongoose.connect('mongodb+srv://zheka:1111@cluster0.ph7oomf.mongodb.net/blog')
.then(()=> console.log("DB OK"))
.catch((err)=> console.log("DB ERROR", error))
const app = express()
app.use(express.json())



app.post("/auth/register", registerValidatior, async (req, res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
    
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
    
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            password: passwordHash,
            avatarUrl: req.body.avatarUrl
        })
    
        const user = await doc.save()
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json("не удалось зарегистрироваться")
    }
   
})

app.listen(5000, (err)=>{
if(err){
    return console.log(err)
}

console.log("SERVER OK")
})