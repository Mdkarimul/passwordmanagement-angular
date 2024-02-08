const asyncHandler  = require("express-async-handler");
const userModel = require('../model/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


// Register user
// GET users/register
// Access private
const registerUser =  asyncHandler(async (req, res, next) => {

   const { full_name , email , mobile , password  }  = req.body;
   if(!full_name || !email || !mobile || !password ){
    res.status(400);
    throw new  Error("All fields are mandatory !");
   } 
   const userAvailable =  await userModel.findOne({email});

   if(userAvailable){
    throw new Error("User already registered !");
   }
//hash password
const hashpassword = await bcrypt.hash(password,10);
const user = await userModel.create({
    full_name,
    email,
    mobile,
    password: hashpassword
});

if(user){
    res.status(201).json({_id:user.id, email:user.email})
}else{
    res.status(400);
    throw new Error('User data is not valid !');
}

});


// Login user
// GET users/login
// Access private
const loginUser =  asyncHandler(async (req, res, next) => {


    const { email , password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('all fields are mandatory !');
    }
    const user = await userModel.findOne({ email });

    //compare password with hashpassword
    if(user && bcrypt.compare(password , user.password)){
      const accessToken = jwt.sign({
        user: user.username,
        email : user.email,
        id : user.id
      },process.env.ACCESS_TOKEN,{ expiresIn:"2m" })
        res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("Email or password not valid !");
    }
 
 });


 // Current user info
// GET users/current
// Access private
const currentUser =  asyncHandler(async (req, res, next) => {

    res.json(req.user);
 
 });



module.exports = {
    registerUser,
    loginUser,
    currentUser
}