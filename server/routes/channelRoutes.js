const express = require('express');
const app = express();
//Define your Router 
const Router = express.Router();
const channelController = require('../controllers/channels_controller');


Router.get('/:id', channelController.readChannels);
Router.get('/:id/messages', channelController.readMessages);

Router.post('/:id/messages', channelController.createChannel);

///import your router with your routes setup.
module.exports = Router;