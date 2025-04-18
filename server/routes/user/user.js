import express from 'express';
import verifyUser from '../../middlewares/auth/verifyUser.js';
import UserModel from '../../models/UserModel.js';

const userApi = express.Router();

//Send User Details To The Frontend
userApi.get('/id/:id', verifyUser, async (req, res) => {
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
});

userApi.get('/username/:username', verifyUser, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username }, '-password -createdAt -updatedAt');
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
});

userApi.get('/friends', verifyUser, async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await UserModel.findOne({ username }).populate('friends', 'name username picture');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ status: true, friends: user.friends });
  } catch(err) {
    console.log("Friends Route Error -", err);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
})

export { userApi };