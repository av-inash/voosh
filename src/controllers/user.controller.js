const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const asyncHandler = require('../utils/asyncHandler')

const UserService = require('../services/user.service')
const { uploadImageToCloudinary } = require('../utils/upload.utils')


const userRegister = asyncHandler(async (req, res) => {
    try {
        console.log('Request data:', req.body);
        await UserService.registerService(req, req.body);
        return res.status(200).json(new ApiResponse(200, "User register succesffully"))


    } catch (error) {

        console.error('Error during signup:', error);
        throw new ApiError(400, error.message)

    }
})
const loginUser = asyncHandler(async (req, res) => {
    try {
        const logedInUser = await UserService.loginService(req.body)
        return res.status(200).json(new ApiResponse(200, logedInUser, "Login succesfuully"))



    } catch (error) {

        if (error instanceof ApiError) {

            return res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }

        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    try {
        // console.log("rrrrrrrrr", req.user)
        await UserService.changePassword(req, req.body)

        return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
    } catch (error) {

        if (error instanceof ApiError) {

            return res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }

        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});

const forgetPassword = asyncHandler(async (req, res) => {
    try {

        const forgetpassword = await UserService.forgetPassword(req.body)


        return res.status(200).json(new ApiResponse(200, "otp sent successfully"))
    } catch (error) {

        if (error instanceof ApiError) {

            return res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }

        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    try {
        const updatePass = await UserService.updatePassword(req.body)
        return res.status(200).json(200, "Password updated successfully")
    } catch (error) {

        if (error instanceof ApiError) {

            return res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }

        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});
const getAlluser = asyncHandler(async (req, res) => {
    try {
        const Alluser = await UserService.getAllPublicUser()
        return res.status(200).json(new ApiResponse(200, Alluser, "successfully get all user"))

    } catch (error) {

        if (error instanceof ApiError) {

            return res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }

        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
})

const userUpdate = asyncHandler(async (req, res) => {
    try {

        const updatedUser = await UserService.updateUserDetails(req, req.body);


        return res.status(200).json(new ApiResponse(200, updatedUser, 'User details updated successfully',));
    } catch (error) {

        if (error instanceof ApiError) {

            return res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }

        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});
const uploadImage = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }
        const imageUrl = await uploadImageToCloudinary(req.file);
        res.status(200).json({ imageUrl });
        console.log("......image url", imageUrl)
    } catch (error) {

        if (error instanceof ApiError) {

            return res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }

        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});

module.exports = { userRegister, loginUser, changeCurrentPassword, updatePassword, forgetPassword, getAlluser, userUpdate, uploadImage }