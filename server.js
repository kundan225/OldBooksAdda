const express = require('express');
require('dotenv').config();
require('./db'); // DB connection
const bookRoutes = require('./routes/bookRoutes');
const path = require('path');
const app = express();
const fs = require('fs');
const booksCategoriesRoute = require('./routes/booksCategories');



// Middleware
app.use(express.json());


const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/books', bookRoutes);
app.use('/api/book-categories', booksCategoriesRoute);


// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

});
