const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller function for user login
const login = async (req, res) => {
  console.log("req: ", req);
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "12345", { expiresIn: '1h' });

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function for changing the password
const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { oldPassword, newPassword } = req.body;

    // Verify old password
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect old password' });
    }

    // Update the password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    // Generate a new JWT token
    const token = jwt.sign({ userId: user._id }, "12345", { expiresIn: '1h' });

    res.status(200).json({ message: 'Password changed successfully', token });
  } catch (error) {
    console.error('Error in changePassword:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  login,
  changePassword,
};
