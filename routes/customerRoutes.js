const express = require('express');
const app = express.Router();
const customerController = require('../controllers/customerController');
const validationMiddleware = require("../middleware/validationMiddleware");

app.post('/customers', validationMiddleware.validate, customerController.addCustomer);
app.get('/customers/:customerId', customerController.getCustomer);
app.put('/customers/:customerId', validationMiddleware.validate, customerController.editCustomer);

module.exports = app;
