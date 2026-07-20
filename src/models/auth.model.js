const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String
        },
        role: {
            type: String,
            default: 'user'
        },
        refreshToken: {
            type: String,
        },
        otp: {
            type: Number
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        googleId: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const Users = mongoose.model("users", authSchema);
module.exports = Users;