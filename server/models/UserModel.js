import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    picture: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }]
})
UserSchema.set('timestamps', true);

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;