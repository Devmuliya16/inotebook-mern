const express = require("express");
const router = express.Router();

//connecting file containing user schema
const user = require("../models/User"); //returns a model

//importing byscript module >npm i bcrypt to hash the password
const bcrypt = require("bcrypt");

//installing the jwttoken
const jwt = require('jsonwebtoken');

//for reading the environment variable file
const JWT_SECRET = process.env.SECRET_KEY;





//Endpoint 1: signup
router.post("/api/auth/signup", async (req, res) => {

  try{
          //if model with same email id exists
          const dublicateUser = await user.findOne({ email: req.body.email });
          if (dublicateUser) {
            return res.status(400).json({ err: "email already exists please enter a new one" });
          }

          //hashing the password 
            //generating salt
            const salt = await bcrypt.genSalt(10);
            //generating hash
            const passwordHash = await bcrypt.hash(req.body.password, salt);

            //creating user in db
            const userdata = await user.create( {
              name:req.body.name,
              email: req.body.email,
              password: passwordHash
            })

          //finding the user and creating the token with id
          const datadb = await user.findOne({email: userdata.email})
          const dataid = {
            user:{
              id: datadb.id
            }
          }
          const authtoken = jwt.sign(dataid,JWT_SECRET);
            console.log(authtoken);
           res.json({authtoken});
  
  }catch(err){
    console.error(err.message);
    res.status(500).json({err: "internal server error"});
  }
});




//Endpoint 2: login user
router.post("/api/auth/login", async (req,res)=>{

  try{
    //finding the user
      const user1 = await user.findOne({email: req.body.email});
      if(!user1){
        return res.status(400).json({err: "please enter valid information"});
      }

      //if email exists then compareing password
      const compareResult = await bcrypt.compare(req.body.password,user1.password);
      if(!compareResult){
        return res.status(400).json({err: "please enter valid information"});
      } 

      //if both email and password is correct then generating auth token with id
      const data = {
        user:{
          id : user1.id
        }
      }
      const logintoken = jwt.sign(data,JWT_SECRET);
      res.json({logintoken});

  }catch(err){
    console.error(err.message);
    res.status(500).json({err: "internal server error"});
  }
 
});


//getting the middleware function
const fetchuser = require('../middleware/fetchuser');
const notes = require("../models/Notes");


//Endpoint 3: for geting loggedin user detail
router.post('/api/auth/details',fetchuser,async (req,res)=>{
  try{
    const userId = req.user.id; //which is upended in the fetchuser function
    if(!userId){
      return res.status(401).json('please enter valid token')
    }
    //now fetch the data by id without password from databse
    const senddata = await user.findById(userId).select('-password');
    console.log(senddata);
    res.send(senddata);
    
  }catch (err){
      console.error(err.message);
      res.status(500).send("internal server error");
  }
})
   


module.exports = router;