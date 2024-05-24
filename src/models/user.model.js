const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(

    {
        fullname: {
            type: String,
        },

        email: {
            type: String,
            // unique: true,
        },

        password: {
            type: String,
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            required: true
        },

        mobile: {
            type: String,
            unique: true
        },

        photo: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
        },

        otp: {
            type: String,
            default: null
        },
        otpCreatedAt: {
            type: Date,
            default: null
        },
        isPublic: {
            type: Boolean,
            default: true
        },


    }, { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next()


})


const User = mongoose.model("User", userSchema)

module.exports = User;