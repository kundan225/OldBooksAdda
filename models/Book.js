const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_name: { type: String, required: true },
  auther_name: String,
  category_name: String,
  subcategory_name: String,
  sell_type: { type: String, enum: ['Sell', 'Donate'], required: true },
  sell_price: { type: Number, required: true },
  // latitude: String,
  // longitude: String,
  image1: { type: String, required: true },
  image2: String,
  image3: String,
location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  }


}, { timestamps: true });

bookSchema.index({ location: '2dsphere' });


module.exports = mongoose.model('Book', bookSchema,'Books');
