const express = require('express');
const workspaceController = require('../controllers/workspaces_controller');
const Router = express.Router();


Router.get('/', workspaceController.readWorkspaces);
Router.get('/users', workspaceController.readUsers);

//Export the Router with your routes setup.
module.exports = Router;