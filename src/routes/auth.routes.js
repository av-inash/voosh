const express = require('express');
const passport = require('passport');
// const generateToken = require('../utils/generateToken');
const CommonHelper = require('../utils/commonHelper');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// console.log("googleeeeeeeeeeeee")

// router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
//     const token = CommonHelper.generateAccessToken(req.user);
//     res.json({ token });
// });
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    // Assuming req.user contains the authenticated user information
    res.render('welcome', { username: req.user.displayName });
});



module.exports = router;
