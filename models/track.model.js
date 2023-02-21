
const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele Track
 * @param {Sequelize} sequelize 
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    const Track = sequelize.define('Track', {
        title : {
            type : DataTypes.STRING(100),
            allowNull: false
        },
        duration : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    }, {
        tableName : 'Track',
    });

    return Track;
}