import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    picture: { type: String }
})
UserSchema.set('timestamps', true);

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;