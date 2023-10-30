const Customer = require('../models/customer');
const PincodeService = require('../services/PincodeService');
const { validationResult } = require('express-validator');

// Function to add a new customer
const addCustomer = async (req, res) => {
  try {
    // Validate the request using express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullName,
      mobileNumber,
      gender,
      addresses,
    } = req.body;

    const birthdate = new Date(req.body.birthdate);

    // Fetch address details using PincodeService
    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        const pincode = address.pincode;
  
        const pincodeDetails = await PincodeService.getPincodeDetails(pincode);
  
        if (pincodeDetails) {
          address.postOfficeName = pincodeDetails.postOfficeName;
          address.district = pincodeDetails.district;
          address.state = pincodeDetails.state;
          address.country = pincodeDetails.country;
        }
    }

    // Create a new customer instance
    const customer = new Customer({
      fullName,
      mobileNumber,
      birthdate,
      gender,
      addresses,
    });

    // Save the customer to the database
    await customer.save();

    res.status(201).json({ message: 'Customer added successfully' });
  } catch (error) {
    console.error('Error in addCustomer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get a customer by ID
const getCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Retrieve customer by ID from the database
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error in getCustomer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to edit customer details
const editCustomer = async (req, res) => {
  try {
    // Validate the request using express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customerId = req.params.customerId;
    const {
      fullName,
      mobileNumber,
      gender,
      addresses,
    } = req.body;

    const birthdate = new Date(req.body.birthdate);

    // Fetch address details using PincodeService
    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        const pincode = address.pincode;
  
        const pincodeDetails = await PincodeService.getPincodeDetails(pincode);
        console.log("pincode: ", pincode);
        console.log("pincodeDetails: ", pincodeDetails);
  
        if (pincodeDetails) {
          address.postOfficeName = pincodeDetails.postOfficeName;
          address.district = pincodeDetails.district;
          address.state = pincodeDetails.state;
          address.country = pincodeDetails.country;
        }
    }

    // Retrieve the customer from the database
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Update customer details
    customer.fullName = fullName;
    customer.mobileNumber = mobileNumber;
    customer.birthdate = birthdate;
    customer.gender = gender;
    customer.addresses = addresses;
    console.log("customer: ", customer);

    // Save the updated customer
    await customer.save();

    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error in editCustomer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addCustomer,
  getCustomer,
  editCustomer,
};

