const Joi = require("joi");

const addAdmin = {
    body: Joi.object().keys({
        email: Joi.string().custom((value, helpers) => {
            if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(value)) {
                return helpers.message(`${value} is not a valid email address!`);
            }
            return value;
        }).required(),

        fullname: Joi.string().required(),

        mobile: Joi.string().required(),
        bio: Joi.string().required(),
        photo: Joi.string().required(),
        password: Joi.string().custom((value, helpers) => {
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{8,}$/.test(value)) {
                return helpers.message(`Password should be at least 8 characters, with at least one uppercase letter, one lowercase letter, one digit, and one special character.`);
            }
            return value;
        }).required(),


    })
}


module.exports = {
    addAdmin
}