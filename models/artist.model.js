
const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele Artist
 * @param {Sequelize} sequelize 
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    const Artist = sequelize.define('Artist', {
        firstname : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        lastname : {
            type : DataTypes.STRING(50),
            allowNull : true
        },
        birthdate : {
            type : DataTypes.DATE,
            allowNull : true
        },
        deathdate : {
            type : DataTypes.DATE,
            allowNull : true
        }
    }, {
        tableName : 'Artist',
    });

    return Artist;
}