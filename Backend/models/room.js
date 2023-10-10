const mongoose = require('mongoose');

const room = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Room', room);