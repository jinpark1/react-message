//Define your router 
const express = require('express');
const Router = express.Router();

//Define your cloudinary controller
const cloudinaryController = require('../controllers/cloudinary_controller');

Router.get('/upload', cloudinaryController.upload);

module.exports = Router;