const Joi = require('@hapi/joi');
const validateRegistration = (data) => {
    const validationSchema = Joi.object().keys({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return validationSchema.validate(data);
}
const loginValidation = (data) => {
    const validationSchema = Joi.object().keys({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return validationSchema.validate(data);
}
module.exports.isRegistrationValid = validateRegistration;
module.exports.isLoginValid = loginValidation;