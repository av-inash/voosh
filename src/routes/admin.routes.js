

const express = require("express");
const adminValidation = require("../validations/admin.validation")
const router = express.Router();
const { addAdmin, GetAllusers } = require("../controllers/admin.controller");
const { verifyJwt } = require("../middlewares/auth.middleware.js");

const validate = require("../helpers/validate.js");

router.post("/add-admin", validate(adminValidation.addAdmin), addAdmin); // Ensure you have a callback function (addAdmin) here
router.get('/get-all-users-admin', verifyJwt, GetAllusers)

module.exports = router;