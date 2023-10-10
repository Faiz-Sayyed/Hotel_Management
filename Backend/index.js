const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const Booking = require('./models/booking');
const Room = require('./models/room');

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello World!!!")
})

app.get('/api/v1/getBookings', async (req, res) => {
    const allBookings = await Booking.find({});
    res.send(allBookings);
})

app.post('/api/v1/addBooking', async (req, res) => {
    const { email, roomType, start, end, price } = req.body;

    await Booking.create({ email, roomType, start, end, price });

    const allBookings = await Booking.find({});
    res.send(allBookings);
})

app.post('/api/v1/editBooking', async (req, res) => {
    const { id, email, roomType, start, end, price } = req.body;

    await Booking.findByIdAndUpdate(id, { email, roomType, start, end, price });

    const allBookings = await Booking.find({});
    res.send(allBookings);
})

app.post('/api/v1/removeBooking', async (req, res) => {
    const id = req.body.id;

    await Booking.findByIdAndRemove(id);

    const allBookings = await Booking.find({});
    res.send(allBookings);
})

app.get('/api/v1/getRooms', async (req, res) => {
    const rooms = await Room.find({});
    res.send(rooms);
})

app.post('/api/v1/addRoom', async (req, res) => {
    const { type, number, price } = req.body;

    await Room.create({ type, number, price });

    const rooms = await Room.find({});
    res.send(rooms);
})

app.post('/api/v1/deleteRoom', async (req, res) => {
    const { id } = req.body;

    await Room.findByIdAndDelete(id);

    const rooms = await Room.find({});
    res.send(rooms);
})

app.post('/api/v1/updateRooms', async (req, res) => {
    const { id, type, number, price } = req.body;

    await Room.findByIdAndUpdate(id, { type, number, price });

    const rooms = await Room.find({});
    res.send(rooms);
})

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server listening at port ${PORT}`));
    } catch (error) {
        console.error(error);
    }
}

start();