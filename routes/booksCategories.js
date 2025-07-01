const express = require('express');
const router = express.Router();
const BooksCategory = require('../models/BooksCategory');

// GET all book categories
router.get('/', async (req, res) => {
  try {
    const data = await BooksCategory.findOne();
    if (!data || !data.categories) {
      return res.status(404).json({ message: 'No categories found' });
    }
    res.status(200).json({ categories: data.categories }); // <-- wrap in object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
