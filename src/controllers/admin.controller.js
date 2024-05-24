const User = require("../models/user.model")

const asyncHandler = require("../utils/asyncHandler")

const ApiError = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const AdminService = require("../services/admin.service")







const addAdmin = asyncHandler(async (req, res) => {
    try {
        // console.log("Request.body", req.body)
        const adminregister = await AdminService.addAdmin(req.body)
        return res.status(200).json(new ApiResponse(200, adminregister, "Admin addedd successfully"))

    } catch (error) {
        console.log(error.message)
        throw new ApiError(400, "Unable to add Admin", error.message)

    }

})
const GetAllusers = asyncHandler(async (req, res) => {
    try {
        const data = await AdminService.getAllUsers()
        return res.status(200).json(new ApiResponse(200, data, "Users get succefully"))

    } catch (error) {
        throw new ApiError(400, error.message)

    }
})
module.exports = { addAdmin, GetAllusers }