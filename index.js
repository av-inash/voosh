const dotenv = require("dotenv")
const connectDB = require("./src/db/index.js")
const app = require('./src/app.js')


require('dotenv').config();



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`server is running at port : ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Mongodb connection failed !!", err)
    })