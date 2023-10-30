const axios = require('axios');

// Function to fetch Pincode details
const getPincodeDetails = async (pincode) => {
  try {
    // Make a GET request to the Pincode service
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

    // Check if the response contains valid data
    if (response.status !== 200 || !Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('Invalid response from Pincode service');
    }

    // Get data from the last record in the response
    const pincodeData = response.data[0].PostOffice[0];
    console.log("pincodeData:", pincodeData)

    // Extract required information
    const postOfficeName = pincodeData.Name;
    const district = pincodeData.District;
    const state = pincodeData.State;
    const country = pincodeData.Country;

    // Return the extracted data
    return {
      postOfficeName,
      district,
      state,
      country,
    };
  } catch (error) {
    console.error('Error in getPincodeDetails:', error);
    throw new Error('Failed to fetch Pincode details');
  }
};

module.exports = {
  getPincodeDetails,
};
