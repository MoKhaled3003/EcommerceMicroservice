const Joi = require('joi');

const CustomTypes = {
    id: Joi.number().min(1).sign("positive"),
    page: Joi.number().sign("positive").required(),
    category_id: Joi.number().min(1),
    brand: Joi.string().min(2).max(50),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    name: Joi.string().min(2).max(50)
}


const RefTypes =  {
    id:  Joi.number().min(1).required(),
    idNotReq:  Joi.number().min(1)
}

module.exports = {CustomTypes, RefTypes}