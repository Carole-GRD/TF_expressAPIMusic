
const { ErrorResponse } = require('../utils/error.response') ;
const { ObjectSchema } = require('yup');

/**
 * bodyValidator
 * @param {ObjectSchema} yupValidator 
 */

const bodyValidator = (yupValidator) => {
    
    return async (req, res, next) => {

        
        try {
            console.log(req.body);

            const validData = await yupValidator.noUnknown().validate(req.body, { abortEarly : false });
            console.log(validData);

            req.body = validData;

            next();
        }
        catch (error) {
            console.log(error);
            // return res.status(400).json(new ErrorResponse(error));
            return res.status(400).json(new ErrorResponse(error.errors));
        }

        
    }
};

module.exports = bodyValidator;