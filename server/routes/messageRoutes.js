const express = require('express');
//Define your router, invoke the ROuter method that returns a new Router instance.
const Router = express.Router();
//import the controller file. 
const messagesController = require('../controllers/messages_controller');
//Define your endpoints. 
Router.get('/channels/:id', messagesController.readChannelMessages);