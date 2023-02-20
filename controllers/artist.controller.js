const { Request, Response } = require('express');

const artistController = {

    // Doc qui premet d'accéder aux différentes propriétés des méthodes
    /** 
     * Get ALL
     * @param { Request } req
     * @param { Response } res
     */
    getAll : (req, res) => {
        res.sendStatus(501);   // 501 : Not Implemented (La route existe mais ne renvoie pas encore de résultat, elle est en cours de construction)
    },

    /** 
     * Get By Id
     * @param { Request } req
     * @param { Response } res
     */
    getById : (req, res) => {
        res.sendStatus(501);
    },

    /** 
     * Create
     * @param { Request } req
     * @param { Response } res
     */
    create : (req, res) => {
        res.sendStatus(501);
    },

    /** 
     * Update
     * @param { Request } req
     * @param { Response } res
     */
    update : (req, res) => {
        res.sendStatus(501);
    },

    /** 
     * Delete
     * @param { Request } req
     * @param { Response } res
     */
    delete : (req, res) => {
        res.sendStatus(501);
    }
}

module.exports = artistController;