const jwt = require('jsonwebtoken');

module.exports = {
    checkLogin : (req, res, next) => {
        const bearer = req.header("access-token");
        if(!bearer){
            res.send({
                msg : "cannot access",
                status:401,
                error : "You Must Be Login"
            })
        } else{
            const token = bearer.split(" ")[1] ;
            try{
                const decodetoken = jwt.verify(token, process.env.SECRET_KEY);
                req.decodetoken = decodetoken;
                next();
            }
            catch(error){
                res.send({
                    msg: "cannot access",
                    status: 401,
                    error:"invalid token"
                })
            }
        }
    }
}