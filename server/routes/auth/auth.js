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
        return res.status(401).json({message: "Invalid Email!"})
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.status(401).json({message: "Invalid Password!"})
    }

    // const token = jwt.sign({email: user.email}, process.env.KEY, {expiresIn: '1h'})
    // // res.cookie('token', token, {httpOnly: true, maxAge: 86400000})
    // res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    // return res.json({status: true, message: "Login Successful!"})
    
    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly: true, maxAge: 360000})
    return res.json({status: true, message: "Login Successfully"})

})

//Verify User Using JWT
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.json({ status: false, message: "No Token"});
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next()
    } catch(err) {
        return res.json(err);
    }
}

auth.get("/verify", verifyUser, (req, res) => {
    return res.json({status: true, message: "Authorized"})
});

//Logout User By Clearing Cookies
auth.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({status: true, message:"Logout Successful!"})
})

export {auth as Auth};