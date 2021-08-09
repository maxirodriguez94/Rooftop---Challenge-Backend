const joi = require('joi')

const schema = joi.object({
    name: joi.string().required().messages({
        'string.empty': 'the atribute test is required',

    }),
    address: joi.string().required().messages({
        'string.empty': 'the atribute addres is required',
    }),

})

module.exports = schema