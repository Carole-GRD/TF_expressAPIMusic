
const yup = require('yup');

const pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


const registerValidator = yup.object({
    firstname : yup.string().required().trim(),
    lastname : yup.string().required().trim(),
    email : yup.string().required().trim().email(),
    password : yup.string().required().min(8).matches(pwRegex)
});



const loginValidator = yup.object({
    email : yup.string().required().trim().email(),
    password : yup.string().required().min(8).matches(pwRegex)
});



module.exports = { registerValidator, loginValidator };