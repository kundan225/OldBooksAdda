const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  id: Number,
  name: String
});

const CategorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  subcategories: [SubcategorySchema]
});

const BooksCategory = mongoose.model('BooksCategory', CategorySchema,'BooksCategories');

module.exports = BooksCategory;
