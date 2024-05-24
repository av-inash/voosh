const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');


cloudinary.config({
    cloud_name: "drkpwvnun",
    api_key: "692814272862656",
    api_secret: "qrGHTQqUICbzjuf00fTH33TRODU"
});
// console.log("key", process.env.CLOUDINARY_API_KEY)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})




const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, { folder: 'hair-assessment' }, (error, result) => {

            if (error) {

                reject(error);
            } else {

                resolve(result.secure_url);
            }


            fs.unlink(file.path, (err) => {
                if (err) {
                    // Log error if deletion fails, but don't reject the promise
                    console.error('Error deleting file:', err);
                }
            });
        });
    });
};



module.exports = { upload, uploadImageToCloudinary };