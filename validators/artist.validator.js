
const yup = require('yup');

// const dateRegex = /^[0-9]{4}-((0[1-9])|(1[0-2]))-[0-3][0-9]$/;

// const artistValidator = yup.object({
//     firstname : yup.string().required().trim().max(100),
//     lastname : yup.string().trim().max(50),
//     birthdate : yup.string().trim().matches(dateRegex),
//     deathdate : yup.string().trim().matches(dateRegex)
// });

const artistValidator = yup.object({
    // firstname : yup.string().trim().max(100),
    firstname : yup.string().required().trim().max(100),
    lastname : yup.string().trim().max(50).nullable(),
    birthdate : yup.date().nullable(),
    deathdate : yup.date().nullable().min(yup.ref('birthdate'))
});

module.exports = artistValidator;