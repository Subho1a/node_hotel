require('dotenv').config(); // Load environment variables

const express = require('express');


const bodyParser = require('body-parser');
const app = express();

const db = require('./db');                  // MongoDB connection
const Person = require('./person_model');           // Person schema
const MenuItem = require('./menu_model');          // Menu schema

const personRoutes = require('./personRoutes');
const menuRoutes = require('./menuRoutes');
const { assign } = require('lodash');
const passport = require('./auth');          // Authentication middleware

// Middleware to log requests
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]--Request made to: ${req.originalUrl}`);
    next();
};




// Middleware setup
app.use(bodyParser.json());
app.use(logRequest);
app.use(passport.initialize());
const LocalAuthenticationMiddleware = passport.authenticate('local', { session: false });


// Routes
app.get('/',  (req, res) => {
    res.send('Hi there');
});
app.use('/person',  personRoutes);
app.use('/menu',   menuRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
