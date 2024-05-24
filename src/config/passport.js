const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user.model');
const CommonHelper = require('../utils/commonHelper');
const initializePassport = (passport) => {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback',
        passReqToCallback: true
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    fullname: profile.displayName
                });
            }
            const token = await CommonHelper.generateAccessToken(user);
            return done(null, { user, token });
        } catch (err) {
            return done(err);
        }
    }));



    passport.serializeUser((user, done) => {
        done(null, user.user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

}


module.exports = initializePassport;
