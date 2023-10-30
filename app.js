const express = require('express');
const app = express();
const database = require('./database');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const authenticate = require("./middleware/authMiddleware");

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/customer', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
