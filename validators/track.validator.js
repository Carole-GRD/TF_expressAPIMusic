// Dans Insomnia :
// ---------------
// {
// 	"title":  "Les dev 3",
// 	"duration": 145,
// 	"GenreId": 1,
// 	"albums": [1, 2],
// 	"artists": [
// 		{ 
// 			"id" : 3 
// 		}, 
// 		{ 
// 			"id" : 4,  
// 			"feat" : true 
// 		}
// 	]
// }


const yup = require('yup');

const createTrackValidator = yup.object({
    title : yup.string().max(100).trim().required(),
    duration : yup.number().integer().positive().required(),
    GenreId : yup.number().integer().positive().required(),
    albums : yup.array().of(
        yup.number().integer().positive()
    ).required(),
    artists : yup.array().of(
        yup.object({
            id : yup.number().integer().positive().required(),
            feat : yup.boolean()
        })
    ).required().min(1)
});

const updateTrackValidator = yup.object({
    title : yup.string().max(100).trim().required(),
    duration : yup.number().integer().positive().required(),
});

module.exports = { createTrackValidator, updateTrackValidator };



