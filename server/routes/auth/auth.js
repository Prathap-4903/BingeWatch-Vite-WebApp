import express from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from "../../modal/UserModel.js"

const auth = express.Router();

//Signup Page Data To Store In MongoDB
auth.post("/sign-up", async(req,res) => {
    const{name, username, email, password, confirm_password} = req.body;
    const user = await UserModel.findOne({email})
    if(user){
        return res.status(400).json({message:"User Already Existed!"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        name, username, email, password: hashedPassword, confirm_password
    })
    await newUser.save();
    return res.status(200).json({message: "User Record Saved!"})
})

//Login Data To Authenticate User Using MongoDB
auth.post("/sign-in", async(req,res) => {
    const{email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(401).json({message: "Invalid Email or Password!"})
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.status(401).json({message: "Invalid Password!"})
    }

    const token = jwt.sign({email: user.email},"MyPrivateKey123",{expiresIn: '7d'})
    res.cookie('token', token, {httpOnly: true, maxAge: 86400000})
    return res.status(200).json({message: "Login Successful!"})

})

//Verify User Using JWT
auth.get("/verify", async(req,res) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({status: false, message: "No Token"});
        }
        const decode = await jwt.verify(token, "MyPrivateKey123");
        return res.status(200).json({message: "Authorized User"});
    } catch(err){
        return res.json(err);
    }
})

//Logout User By Clearing Cookies
auth.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({status: true, message:"Logout Successful!"})
})

export {auth as Auth};