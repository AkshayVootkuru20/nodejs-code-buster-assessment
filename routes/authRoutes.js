const express = require('express');
const app = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");

app.post('/login', authController.login);
app.post('/change-password', authMiddleware.authenticate, authController.changePassword);

module.exports = app;
