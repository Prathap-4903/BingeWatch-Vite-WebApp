import express from 'express';
import verifyUser from '../../middlewares/auth/verifyUser.js';
import UserModel from '../../models/UserModel.js';

const userApi = express.Router();

//Send User Details To The Frontend
userApi.get('/:id', verifyUser, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id, '-password -createdAt -updatedAt');
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found!" });
        }
        const userData = {
            ...user._doc,
            picture: `${req.protocol}://${req.get('host')}/${user.picture}`
        };
        // Send user details
        return res.status(200).json({ status: true, data: userData, message: "User Data Send Successfully!" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ status: false, message: "Server Error" });
    }
})

export { userApi };