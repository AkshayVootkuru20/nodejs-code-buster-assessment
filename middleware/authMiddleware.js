const jwt = require('jsonwebtoken');

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').split(" ")[1];
    console.log("token:", token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, '12345');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = {
  authenticate,
};
