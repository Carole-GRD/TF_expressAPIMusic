
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
            allowNull : false,
            validate : {
                isAlpha : true,   // attention "D'Alessendro", "Jean-Pierre" ne passent pas !
                notNull : true,
                notEmpty : true,
                len : [1, 100]
            }
        },
        lastname : {
            type : DataTypes.STRING(50),
            allowNull : true,
            validate : {
                isAlpha : true,  // attention, les noms du genre "D'Alessendro", "Jean-Pierre" ne passeront pas !
                notEmpty : true,
                len : [1, 50]
            }
        },
        birthdate : {
            type : DataTypes.DATE,
            allowNull : true,
            validate : {
                isDate: true 
            }
        },
        deathdate : {
            type : DataTypes.DATE,
            allowNull : true,
            validate : {
                isDate: true,
                customValidator() {
                    if (this.deathdate <= this.birthdate && this.deathdate != null) {
                        throw new Error('La date de décès doit être supérieure à la date de naissance !');
                    }  
                }
            },
        }
    }, {
        tableName : 'Artist',
    });

    return Artist;
}