
const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele Album
 * @param {Sequelize} sequelize 
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    const Album = sequelize.define('Album', {
        title: {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        cover : {
            type : DataTypes.STRING,
            allowNull : true
        }
    }, {
        tableName : 'Album',
    });

    return Album;
}