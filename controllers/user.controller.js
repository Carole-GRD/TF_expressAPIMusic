const { Request, Response } = require('express');


const userController = {
    getAll : (req, res) => {res.sendStatus(501)},
    getById : (req, res) => {res.sendStatus(501)},
    create : (req, res) => {res.sendStatus(501)},
    update : (req, res) => {res.sendStatus(501)},
    delete : (req, res) => {res.sendStatus(501)}
}

module.exports = userController;