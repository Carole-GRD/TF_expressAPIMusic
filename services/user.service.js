const { UserDTO } = require('../dto/user.dto');
const db = require('../models');

const userService = {
    getAll : async (/*offset, limit*/) => {
        const { rows, count } = await db.User.findAndCountAll({
            distinct : true,
            /*offset,
            limit*/
        });
        return {
            users : rows.map(user => new UserDTO(user)),
            count
        }
    },

    getById : async (id) => {
        const user = await db.User.findByPk(id);
        return user ? new UserDTO(user) : null;
    },

    create : async (userToAdd) => {
        const user = await db.User.create(userToAdd);
        return user ? new UserDTO(user) : null;
    },

    update : async (userToUpdate) => {
        const updatedRow = await db.User.update(userToUpdate, {
            where : { id }
        });
        return updatedRow[0] === 1;
    },

    delete : async (id) => {
        nbDeleteRow = await db.User.destroy({
            where : { id }
        });
        return nbDeleteRow === 1;
    }
}

module.exports = userService;