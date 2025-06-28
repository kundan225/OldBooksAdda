const mongoose = require('mongoose');
//require('dotenv').config();

//const mongoUrl= process.env.LOCAL_URL

const mongoUrl= process.env.DB_URL;

mongoose.connect(mongoUrl);

const db = mongoose.connection;
//add comment for checking jh

db.on('connected', () => console.log('✅ Mongoose connected'));
db.on('error', (err) => console.error('❌ Mongoose error:', err));
db.once('open', () => console.log('🚀 Mongoose connection open'));

module.exports = db;
