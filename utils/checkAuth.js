import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, '')
    
    if(token){
        const decodet = jwt.verify(token, 'secret123')
       
    req.userId = decodet._id
    next()
    }else{
        res.status(403).json({
            message: "Нет доступа"
        })
    }
}

    