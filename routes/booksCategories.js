const express = require('express');
const router = express.Router();
const BooksCategory = require('../models/BooksCategory');

// GET all book categories
router.get('/', async (req, res) => {
  try {
    const categories = await BooksCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
