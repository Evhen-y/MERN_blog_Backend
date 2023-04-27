import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {registerValidatior} from "./validations/auth.js"
import {validationResult} from "express-validator"
import UserModel from "./model/User.js"
import bcrypt from "bcrypt"
import checkAuth from "./utils/checkAuth.js"
mongoose.connect('mongodb+srv://zheka:1111@cluster0.ph7oomf.mongodb.net/blog')
.then(()=> console.log("DB OK"))
.catch((err)=> console.log("DB ERROR", error))

const app = express()
app.use(express.json())

app.listen(5000, (err)=>{
    if(err){
        return console.log(err)
    }
    
    console.log("SERVER OK")
    })

app.post("/auth/login", registerValidatior, async (req, res)=>{
    try {
        const user = await UserModel.findOne({email: req.body.email}) // если такой email есть он запишется в переменную если нет будет null

        if(!user){
           return res.status(404).json({
                message: "Пользователь не Найден"
            })
        }

        const passwordVerification = await bcrypt.compare(req.body.password, user._doc.passwordHash) //сравнивает пароль с формы с зашифрованым паролем из базы
            if(!passwordVerification){
             return   res.status(404).json({
                    message: "не внерный пороль"
                })
            }

            const token = await jwt.sign({
                _id: user.id
            },
            'secret123',
            {
             expiresIn: "30d"   
            }
            )

            const {passwordHash, ...userData} = user._doc
            
            res.json({
                ...userData,
                token
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "пользователь не найден"
        })
    }
} )

app.get("/auth/me", checkAuth, async (req, res)=>{
    try {
        console.log("req.user", req.userId)
        const user = await UserModel.findById(req.userId)
        console.log("user", user)
        if(!user){
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }

        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData
        })
    } catch (error) {
        res.status(404).json({
            message: "пользователь не найден"
        })
    }
} )

app.post("/auth/register", registerValidatior, async (req, res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
    
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
    
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl
        })
    
        const user = await doc.save()
        
        const token = jwt.sign({
            _id: user.id //вкладываем в токен ID из монго
        },
        'secret123', //секретный ключ
        {
            expiresIn: '30d' //срок действия токена
        }
        )

        const { passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json("не удалось зарегистрироваться")
    }
   
})

