//import express 
const express = require('express');
//import the controller file responible for handle operations
const userController = require('../controllers/user_controller');
//Define your router 
const Router = express.Router();


Router.get('/user-data', userController.readUserData);
//Define your post endpoints 
Router.post('/login', userController.login);
Router.get('/register', userController.register);


module.exports = Router;