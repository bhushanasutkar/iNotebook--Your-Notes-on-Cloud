const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWTSecret='hitherebhushasn&';
const fetchuser=require('../middlewares/fetchuser')





router.post('/createuser', [
    body('name','Enter a valid name').isLength({ min:3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','Password should contain atleast 5 characters').isLength({ min: 5 })
], async(req, res) => {
  let success=false;
  let hi=true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ hi,success,success,errors: errors.array() });
    }
    try{

        let user= await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,error:"sorry a user with this email already on existt"})
        }
        var salt = await bcrypt.genSaltSync(10);
        const secpasswword =  await bcrypt.hash(req.body.password,salt);
       
       
        user= await User.create({
         name: req.body.name,
        password: secpasswword,
        email: req.body.email,
      });
      const data={
        user:{
          id: user.id
        }
      }
      const authtoken=jwt.sign( data, JWTSecret );
      success=true;
      res.json({success,authtoken})
     } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
      
      
      
     
})





// in both login and create we  will get the the token 


router.post('/login', [
  
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cannot be blank').exists(),
    // what are these two parameters. 
], async (req, res) => {
    let success =false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,password}=req.body;
    try{

        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please login with correct user credentials"})
        }
        // // Below one returns true or false
        const passwordcompare= await bcrypt.compare(password, user.password);
        if(passwordcompare){
          
          return res.status(400).json({success,error:`Please login with correct password credentials ${password} ${user.password}`})

        }
       
      const data={
        user:{
          id: user.id
          // this is the user that you see in fetuser midleware  as we pass tge data and then extract the data in which user is present
        }
      }
      // this is payload

      const authtoken=jwt.sign( data, JWTSecret );
      // this auth token will have the information stored in it as a form of payload i.e the id we passed as payload
      success=true
      res.json({success,authtoken})
    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
      
      
      
     
})


router.post('/loginauth',fetchuser, async (req, res) => {
  // here we pass the token in body in this api
   
    try{

       let userid= req.user.id;
       const user =await User.findById(userid).select("-password");
       res.send(user)
    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
      
      
      
     
})


module.exports = router