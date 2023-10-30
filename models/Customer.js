// models/Customer.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    maxlength: 124,
  },
  landmark: {
    type: String,
    maxlength: 64,
  },
  pincode: {
    type: String,
    required: true,
    maxlength: 6,
  },
  postOfficeName: {
    type: String,
    maxlength: 64,
  },
  district: {
    type: String,
    maxlength: 64,
  },
  state: {
    type: String,
    maxlength: 64,
  },
  country:{
    type: String,
    maxlength: 64,
  },
});

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxlength: 32,
  },
  mobileNumber: {
    type: String,
    required: true,
    maxlength: 10,
  },
  birthdate: {
    type: Date,
  },
  gender: {
    type: Number,
    enum: [1, 2],
  },
  addresses: [addressSchema],
  // Other customer fields
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
