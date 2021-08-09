const joi = require('joi')

const schema = joi.object({
 email: joi.string().required().email().messages({
        'string.empty': 'the atribute'
    }),

})

module.exports = schema