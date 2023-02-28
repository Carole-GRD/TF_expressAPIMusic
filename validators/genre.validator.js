
const yup = require('yup');

const genreValidator = yup.object({
    name : yup.string().required().max(50).trim()
});

module.exports = genreValidator;


