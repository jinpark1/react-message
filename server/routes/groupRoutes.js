const express = require('express');
const Router = express.Router();
const groupController = require('../controllers/groups_controller');

Router.get('/users', groupController.readUsers);
Router.post('/', groupController.createGroup);

//export your Router with your routes. 
module.exports = Router;