const express = require('express');
const router = express.Router();
const BooksCategory = require('../models/BooksCategory');

// GET all book categories
router.get('/', async (req, res) => {
  try {
    const data = await BooksCategory.findOne().lean(); // Use `.lean()` to get plain JS object

    if (!data || !data.categories || data.categories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }

    res.status(200).json({ categories: data.categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
