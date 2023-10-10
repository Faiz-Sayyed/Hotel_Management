const mongoose = require('mongoose');

const booking = new mongoose.Schema({
    email: String,
    roomType: String,
    start: Date,
    end: Date,
    price: Number,
})

module.exports = mongoose.model('Booking', booking);