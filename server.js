const express = require('express');
require('dotenv').config();
require('./db'); // DB connection
const bookRoutes = require('./routes/bookRoutes');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/books', bookRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

});
