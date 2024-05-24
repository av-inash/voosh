const User = require('../models/user.model')
const ApiError = require('../utils/ApiError.js')
const ApiResponse = require('../utils/ApiResponse')
const CommonHelper = require('../utils/commonHelper')
const httpStatus = require("http-status");
const { sendEmail } = require("../utils/nodemailer.util.js")
// const { uploadImageToCloudinary } = require('../utils/upload.utils.js')

class UserService {
    registerService = async (req, data) => {
        const existedUser = await User.findOne({ email: data.email })
        if (existedUser) {

            throw new ApiError(400, "This email is already in use.")
        }
        console.log("pass", data.password)
        console.log("data", data)
        const passwordHash = await CommonHelper.hashPassword(data.password);

        // const imageUrl = await uploadImageToCloudinary(req.file);

        const user = await User.create({
            email: data.email,
            mobile: data.mobile,
            bio: data.bio,
            role: "user",
            photo: data.photo,
            password: passwordHash,
            fullname: data.fullname,
        })
        return user


    }
    loginService = async (data) => {
        const user = await User.findOne({ email: data.email })
        if (!user) {
            throw new ApiError(400, "User does not exist")
        }
        const isPasswordValid = await CommonHelper.isPasswordCorrect(data.password, user.password)
        if (!isPasswordValid) {

            throw new ApiError(400, "Invalid user Credential")
        }
        const role = user.role
        const accessToken = await CommonHelper.generateAccessToken(user._id)
        const refreshToken = await CommonHelper.generateRefreshToken(user._id)
        return { accessToken, refreshToken, role, user }

    }
    forgetPassword = async (data) => {
        function generateOTP() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new ApiError(400, "user not found")
        }
        const otp = generateOTP();
        user.otp = otp;
        user.otpCreatedAt = new Date();
        await user.save();
        await sendEmail(data.email, 'OTP for password recovery',
            `put this otp on required field to reset password
          ${otp}`)
    }
    updatePassword = async (data) => {
        const user = await User.findOne({ email: data.email });
        const validOtp = CommonHelper.isValidOTP(user.otpCreatedAt);
        if (!validOtp) {

            throw new ApiError(400, " OTP expired");
        }
        if (user.otp === data.otp) {
            const hashedPassword = await CommonHelper.hashPassword(data.newPassword)
            user.password = hashedPassword;
            user.otp = "";
            await user.save();

        } else {
            throw new ApiError(400, "Otp is incorrect please provide correct otp")
        }

    }
    changePassword = async (req, data) => {

        const { user } = req;
        // console.log("userrrrrrrrr", user)

        if (!user || !user._id) {
            throw new ApiError(404, "User not found or user ID is missing");
        }
        const userToUpdate = await User.findById(user._id);
        if (!userToUpdate) {
            throw new ApiError(404, "User not found");
        }
        const isPasswordCorrect = await CommonHelper.isPasswordCorrect(data.oldPassword, userToUpdate.password)
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid old password");
        }
        const hashpass = await CommonHelper.hashPassword(data.newPassword)
        userToUpdate.password = hashpass;
        await userToUpdate.save({ validateBeforeSave: false });
    }
    getAllPublicUser = async (req, data) => {
        const user = await User.find({ role: "user", isPublic: true })
        return user
    }

    updateUserDetails = async (req, data) => {
        const { user } = req;
        console.log("userrrrrrrrr", user)

        if (!user || !user._id) {
            throw new ApiError(404, "User not found or user ID is missing");
        }

        const userr = await User.findById(user._id);

        if (!userr) {
            throw new ApiError(404, 'User not found');
        }



        if (data.mobile) {
            userr.mobile = data.mobile;
        }
        if (data.bio) {
            userr.bio = data.bio;
        }
        if (data.photo) {
            userr.photo = data.photo;
        }
        if (data.fullname) {
            userr.fullname = data.fullname
        }

        await userr.save();

        return userr;




    }



}
module.exports = new UserService()
