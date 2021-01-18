const Joi = require('joi');

const CustomTypes = {
    id: Joi.number().min(1).required(),
    page: Joi.number().sign("positive").required(),
    category_id: Joi.number().min(1).required(),
    featured: Joi.bool().required()
}


const RefTypes =  {
    id:  Joi.number().min(1).required(),
    idNotReq:  Joi.number().min(1)
}

module.exports = {CustomTypes, RefTypes}