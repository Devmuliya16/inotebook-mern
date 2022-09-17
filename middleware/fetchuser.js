const jwt = require('jsonwebtoken');

//for reding the environment variable file variable
require('dotenv').config();
const JWT_SECRET = process.env.SECRET_KEY;


//this is for authenticating the user before every api access
const fetchuser = (req,res,next) =>{
    try{
        //get user from jwt token
        //token will be sent by header of this endpoint /api/auth/details
        const token = req.header('auth-token');
        if(!token){
            return res.status(401).json({err:"please authenticate using valid token"});
        }
        //if token is there than compare it
        const data = jwt.verify(token,JWT_SECRET);
        
        //remember : we created the token with structure user{id:} in Endpoint 2
        //it will return this object
        
        //appending the req.user to the req
        req.user = data.user;
        next(); //calling the next function written in the post request on the same endpoint
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("internal server error");
    }


}

//exporting the module
module.exports = fetchuser;