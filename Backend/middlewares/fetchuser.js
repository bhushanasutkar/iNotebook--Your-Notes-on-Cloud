const jwt = require('jsonwebtoken');
const JWTSecret='hitherebhushasn&';


const fetchuser=(req,res,next)=>{
    const token=req.header("auth-token");
    // i guess this the auth-token that we send in thunderclient along wih the tojen
    if(!token){
        res.status(401).send({error:"Please Authenticate using a valid token"});

    }
    try {
        const data=jwt.verify(token,JWTSecret);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please Authenticate using a valid token"});
        
    }

}

module.exports=fetchuser;