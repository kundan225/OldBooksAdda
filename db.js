const mongoose = require('mongoose');
//require('dotenv').config();

const mongooseURL = 'mongodb://localhost:27017/OldBooksAdda';

//const mongoUrl= process.env.LOCAL_URL

//const mongoUrl= process.env.DB_URL;

mongoose.connect(mongooseURL);

const db = mongoose.connection;
//add comment for checking

db.on('connected', () => console.log('✅ Mongoose connected'));
db.on('error', (err) => console.error('❌ Mongoose error:', err));
db.once('open', () => console.log('🚀 Mongoose connection open'));

module.exports = db;
