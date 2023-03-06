
const yup = require('yup');

const albumValidator = yup.object({
    title : yup.string().required().trim().max(50),
    cover : yup.string().trim().nullable()
});

// nullable -> champ obligatoire mais peut être null
// optional -> champ non obligatoire

const albumCoverValidator = yup.object({
    cover : yup.mixed()/*.required('Image requise')*/
})

module.exports = { albumValidator, albumCoverValidator };
