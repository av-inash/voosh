const User = require('../models/user.model.js');
const ApiError = require('../utils/ApiError.js');


const CommonHelper = require("../utils/commonHelper.js")




class AdminService {

    addAdmin = async (data) => {
        // console.log('Request Body:', data);
        const existedUser = await User.findOne({ email: data.email })
        if (existedUser) {

            throw new ApiError(400, "This email is already in use.")
        }
        // console.log("pass", data.password)
        // console.log("data", data)
        const passwordHash = await CommonHelper.hashPassword(data.password);

        // const imageUrl = await uploadImageToCloudinary(req.file);

        const user = await User.create({
            email: data.email,
            mobile: data.mobile,
            bio: data.bio,
            role: "admin",
            photo: data.photo,
            password: passwordHash,
            fullname: data.fullname,
        })
        return user


    }

    getAllUsers = async (req, res) => {
        const users = await User.find({ role: "user" })
        return users
    }
}

module.exports = new AdminService()
