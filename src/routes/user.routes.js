// const { Router } = require("express");
const express = require("express");
const userValidation = require("../validations/user.validation.js");
const { loginUser,

    changeCurrentPassword,
    userRegister,
    forgetPassword,
    updatePassword,
    getAlluser,
    userUpdate,
    uploadImage

} = require("../controllers/user.controller.js");
const { verifyJwt } = require("../middlewares/auth.middleware.js");

const validate = require("../helpers/validate.js");
const { upload } = require('../utils/upload.utils.js')





const router = express.Router();


router.post("/register", validate(userValidation.register), userRegister)
router.post("/login", validate(userValidation.login), loginUser)
router.get("/get-users", verifyJwt, getAlluser)
router.post("/updatePassword", updatePassword)
router.post("/forgetpassword", validate(userValidation.forgotPass), forgetPassword)
router.post("/changepassword", validate(userValidation.changePass), verifyJwt, changeCurrentPassword)
router.put('/update-details', validate(userValidation.updateuserdetail), verifyJwt, userUpdate)
router.post('/upload-image', verifyJwt, upload.single('image'), uploadImage)















module.exports = router;
