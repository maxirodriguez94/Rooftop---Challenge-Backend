const joi = require('joi')

const schema = joi.object({
    code: joi.string().required().alphanum().length(8).messages({
        'string.empty': 'the atribute code is required',
        'string.alphanum': 'code attribute must be a combination of letters and numbers',
        'string.lenght': `the code contains  characters and must be 8 characters`
    }),

})

module.exports = schema