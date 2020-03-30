const express = require('express');
const server = express();

// Module without dependency
const validate = require('./validate');

// Module with dependency on another module
const { Sequelize } = require('sequelize');
const database = new Sequelize('sqlite::memory::', { logging: false });
const subscribe = require('./subscribe')(database);

// Initialize the database and start the application
database.query("CREATE TABLE subscriber (email TEXT)");

// Initialize the server
server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.render('index');
});

server.post('/', async (req, res) => {
    let email = req.body.email;
    if (!validate(email)) {
        let message = {success: false, value: `"${email}" is an invalid email.`};
        res.render('index', {message: message});
    } else {
        await subscribe(email)
        let message = {success: true, value: "Thank you for subscribing!"};
        res.render('index', {message: message});
    }
});

module.exports = server;
