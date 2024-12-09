import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from "../../modal/UserModel.js";
import { upload } from '../../middlewares/multer/upload.js';
import verifyUser from '../../middlewares/auth/verifyUser.js';

const auth = express.Router();

//Signup Page Data To Store In MongoDB
auth.post("/sign-up", upload.single("picture"), async(req,res) => {
    const {name, username, email, password, confirmPassword} = req.body;
    const user = await UserModel.findOne({ email });
    if(user){
        return res.status(400).json({message:"User Already Existed!"});
    }
    if(password.length & confirmPassword.length != 8){
        return res.status(401).json({message: "Password length should be minimum of 8 characters!"});
    }
    if(confirmPassword != password){
        return res.status(401).json({message:"Password not matched!"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if(!req.file) {
        return res.status(500).json({ error: "No File Found" });
    }
    const newUser = new UserModel({
        name, username, email, password: hashedPassword, confirmPassword, picture: req.file.path
    });
    await newUser.save();
    return res.status(200).json({status: true, message: "User Record Saved!"});
})

//Login Data To Authenticate User Using MongoDB
auth.post("/sign-in", async(req,res) => {
    const{email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(401).json({message: "Invalid Email!"});
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(401).json({message: "Invalid Password!"});
    }

    // const token = jwt.sign({email: user.email}, process.env.KEY, {expiresIn: '1h'})
    // res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    // return res.json({status: true, message: "Login Successful!"})

    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '30d'});
    res.cookie('token', token, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
    return res.status(200).json({status: true, message: "Login Successfully"});

})

//Verify User Using JWT
// const verifyUser = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if(!token) {
//             return res.json({ status: false, message: "No Token"});
//         }
//         const decoded = await jwt.verify(token, process.env.KEY);
//         req.user = decoded;
//         next()
//     } catch(err) {
//         return res.json(err);
//     }
// };

auth.get("/verify", verifyUser, (req, res) => {
    return res.status(200).json({status: true, message: "Authorized", user: req.user});
});

//Logout User By Clearing Cookies
auth.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({status: true, message:"Logout Successful!"});
})

export {auth as Auth};