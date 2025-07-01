const express = require('express');
const multer = require('multer');
const Book = require('../models/Book');
const router = express.Router();
const BooksCategory = require('../models/BooksCategory');


// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]);

router.post('/upload', uploadFields, async (req, res) => {
  const {
    book_name,
    auther_name,
    category_name,
    subcategory_name,
    sell_type,
    sell_price,
    latitude,
    longitude
  } = req.body;

  // Validations
  if (!req.files.image1 || !book_name || !sell_price || !sell_type) {
    return res.status(400).json({ error: 'Required fields missing' });
  }
  if (!['Sell', 'Donate'].includes(sell_type)) {
    return res.status(400).json({ error: 'Invalid sell_type' });
  }

  try {
    const book = new Book({
  book_name,
  auther_name,
  category_name,
  subcategory_name,
  sell_type,
  sell_price,
  image1: req.files.image1?.[0]?.filename,
  image2: req.files.image2?.[0]?.filename,
  image3: req.files.image3?.[0]?.filename,
  location: {
    type: 'Point',
    coordinates: [parseFloat(longitude), parseFloat(latitude)]
  }
});

    await book.save();
    res.status(201).json({ message: 'Book uploaded', data: book });
  } catch (err) {
      console.error("Upload error:", err); // ← Add this line

    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      book_name,
      auther_name,
      category_name,
      subcategory_name,
      latitude,
      longitude
    } = req.query;

    const filters = {};

    if (book_name) filters.book_name = { $regex: book_name, $options: 'i' };
    if (auther_name) filters.auther_name = { $regex: auther_name, $options: 'i' };
    if (category_name) filters.category_name = category_name;
    if (subcategory_name) filters.subcategory_name = subcategory_name;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let aggregateQuery = [];

    // Add geoNear only if lat/lng are present
    if (latitude && longitude) {
      aggregateQuery.push({
        $geoNear: {
          near: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          distanceField: 'distanceInMeters',
          spherical: true
        }
      });

      aggregateQuery.push({
        $addFields: {
          distanceInKm: { $divide: ['$distanceInMeters', 1000] }
        }
      });
    } else {
      aggregateQuery.push({ $match: filters });
    }

    if (latitude && longitude && Object.keys(filters).length > 0) {
      // If using geoNear AND other filters
      aggregateQuery.push({ $match: filters });
    }

    aggregateQuery.push({ $skip: skip });
    aggregateQuery.push({ $limit: parseInt(limit) });

    const books = await Book.aggregate(aggregateQuery);
    res.json({ total: books.length, data: books });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


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
