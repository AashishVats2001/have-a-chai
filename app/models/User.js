import mongoose, { mongo } from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    name: String,
    username: { type: String, required: true },
    about: String,
    tagline: String,
    profilepic: String,
    profilepicpublicid: String,
    coverpic: String,
    coverpicpublicid: String,
    razorpayid: String,
    razorpaysecret: String,
    socials: {
        github: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        gmail: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
        youtube: { type: String },
    },
    delete: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || model("User", UserSchema);