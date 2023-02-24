

const { Sequelize, ModelStatic, DataTypes } = require('sequelize');

/**
 * Constructeur du modèle User
 * @param {Sequelize}  sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {

    const User = sequelize.define('User', {
        firstname : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        lastname : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        email : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        password : {
            type : DataTypes.STRING(50),
            allowNull : false
        }
    }, {
        tableName : 'User'
    })

    return User;
}