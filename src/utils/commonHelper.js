const User = require('../models/user.model.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class CommonHelper {

    hashPassword = async (password) => {
        return await bcrypt.hash(password, 10);
    }


    isPasswordCorrect = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword)
    }
    generateAccessToken = async (user) => {
        return jwt.sign(

            {
                _id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        );
    }
    generateRefreshToken = async (user) => {
        return jwt.sign(
            {
                id: user._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        );
    }
    isValidOTP = (otpCreatedAt) => {
        if (otpCreatedAt instanceof Date && otpCreatedAt.getTime) {
            const currentTime = new Date();
            const otpExpirationTime = new Date(otpCreatedAt.getTime() + 2 * 60000); // 2 minutes expiration time

            // Check if current time is before the OTP expiration time
            return currentTime < otpExpirationTime;
        }

        // Return false if otpCreatedAt is null or not a valid Date object
        return false;
    };




}

module.exports = new CommonHelper()