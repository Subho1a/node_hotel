const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = process.env.DB_LOCAL_URL ;    // Use the local MongoDB URL for development
// If you want to use the cloud MongoDB URL, uncomment the line below
const mongoURL = process.env.DB_url;

// Connect to MongoDB
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

db.on('error', (error) => {
    console.log('MongoDB connection Error:', error);
});

module.exports = db;
