const joi = require('joi')

const schema = joi.object({
    code: joi.string().required().length(8).messages({
        'string.empty': 'the atribute code is required',
    }),

    message: joi.string().min(10).max(500).error(errors => {
        error.forEach(err => {
            let valueLenght = err.local.value.lenght
            

            if (err.code === 'string.lenght' ) {
                err.message = `el codigo continene  ${valueLenght} caracteres y debe tener 8 caracteres`
            } else if (err.code === 'string.empty') {
                err.message = 'El mensaje es requerido'
            }

        })
        return errors
    })
})


module.exports = schema