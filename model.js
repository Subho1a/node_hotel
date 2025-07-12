const mongoose = require('mongoose');

// define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        enum: ['chef', 'Waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: Number,
        unique: true, // fixed
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // fixed
    },
    addres: {
        type: String,
    },
    salary: {
        type: String,
        required: true,
    }
});

// Ensure indexes are created
personSchema.index({ email: 1 }, { unique: true });
personSchema.index({ mobile: 1 }, { unique: true });

// create person model
const person = mongoose.model('person', personSchema);
module.exports = person;