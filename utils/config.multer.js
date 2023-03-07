
// -----------   CONFIG MULTER  --------------
const multer = require('multer');
const uuid = require('uuid');


const config = (folder) => {
    
    return storage = multer.diskStorage({ 
        destination : (req, file, callback) => {
            callback(null, `public/images/${folder}`);
        },
        filename : (req, file, callback) => {
            console.log('multer file : ', file);
                const name = uuid.v4();
                const ext = file.originalname.split('.').at(-1);     
                callback(null, name + '.' + ext);
        }
    });
}

module.exports = config;

// ---------   FIN CONFIG MULTER  ------------


