const express = require("express");
const session = require("express-session");
const passport = require("passport");
const route = require('../src/routes/user.routes.js');
const adminRoutes = require("../src/routes/admin.routes.js");
const authRoutes = require('../src/routes/auth.routes.js');
const initializePassport = require('../src/config/passport.js');
const path = require('path');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: '2345678987tyrdsxfcgvbhjoiuytrdfghj',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// User routes
app.use("/api/v1/users", route);

// Admin routes
app.use("/api/v1/admin", adminRoutes);

// Auth routes for Google 
app.use('/auth', authRoutes);

module.exports = app;
