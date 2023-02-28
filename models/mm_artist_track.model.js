
const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele MM_Artist_Track
 * @param {Sequelize} sequelize 
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    const MM_Artist_Track = sequelize.define('MM_Artist_Track', {
       feat : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false,
        validate : {
            notNull : true,
            isIn : [[true, false]]   
        }
       }
    }, {
        tableName : 'MM_Artist_Track',
    });

    return MM_Artist_Track;
}