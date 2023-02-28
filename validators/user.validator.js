
const yup = require('yup');

const updateUserValidator = yup.object({
    firstname : yup.string().required().trim(),
    lastname : yup.string().required().trim(),
    email : yup.string().required().trim().email()
});

module.exports = updateUserValidator;