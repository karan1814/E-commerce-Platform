const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protection = async ( req, res, next)=>{
    let token;
    
    //header check 
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECREAT);
            req.user = await User.findById(decoded.id).select("-password");// User extracted and password excluded.

            next();
        }catch(err){
            res.status(401).json({ message : " Not Authorized , token failed"});
        }
    }

    if(!token){
        req.status(401).json({ message : " Not Authorized , No Token"});
    }
};

const admin = (req, res , next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(403).json({ message: "Admin access denied"});
    }
};

module.exports = { protection, admin };