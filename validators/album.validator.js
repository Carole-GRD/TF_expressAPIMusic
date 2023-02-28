
const yup = require('yup');

const albumValidator = yup.object({
    title : yup.string().required().trim().max(50),
    cover : yup.string().trim().nullable()
});

// nullable -> champ obligatoire mais peut être null
// optional -> champ non obligatoire

module.exports = albumValidator;
