// user.js

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Email format validation
  },
  password: {
    type: String,
    required: true,
    minLength: 8, 
  },
  fullName: {
    type: String,
    maxLength: 32,
    validate: /^[a-zA-Z\s]*$/, 
  },
  mobileNumber: {
    type: String,
    match: /^[0-9]{10}$/, 
  },
  birthdate: {
    type: Date,
  },
  gender: {
    type: Number,
    enum: [1, 2], // 1=Male, 2=Female
  },
  addresses: [
    {
      address: {
        type: String,
        maxLength: 124,
      },
      landmark: {
        type: String,
        maxLength: 64,
      },
      pincode: {
        type: String,
        match: /^[0-9]{6}$/,
      },
      postOffice: {
        type: String,
      },
      district: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
