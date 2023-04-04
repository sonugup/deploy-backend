const jwt=require("jsonwebtoken")
require('dotenv').config();

const authenticate=(req, res, next) => {
    const token=req.headers.authorization || null
    if(token){
        const decoded=jwt.verify(token, prossece.env.key)
        if(decoded){
            const userID=decoded.userID
            console.log(decoded)
            req.body.userId=userID
            next()
        }else{
            res.send("Loging First")
        }
    }else{
        res.send("Login First")
    }
}

module.exports={
    authenticate
}
