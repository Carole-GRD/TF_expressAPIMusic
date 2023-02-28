const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele Genre
 * @param {Sequelize} sequelize 
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    const Genre = sequelize.define('Genre', {
        name : {
            type : DataTypes.STRING(50),
            allowNull: false,
            unique : 'UK_Genre_Name',  // Attention, unique peut aussi recevoir un boolean, dans ce cas, la clef sera autogénérée et compliquée à manipuler, si vous mettez un nom de clef à la place, c'est d'office true avec précision de la clef
            validate : {
                len : [1, 50],
                notNull : true,
                notEmpty : true
            }
        }
    }, {
        tableName : 'Genre',
        timestamps : false, // Par défaut à true, crée deux colonnes createdAt et updatedAt pour stocker date de création et date de dernière modification 
    });

    return Genre;
}