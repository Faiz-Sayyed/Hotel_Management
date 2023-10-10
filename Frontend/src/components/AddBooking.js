import React, { useState } from 'react'

const AddBooking = ({ rooms, setRooms }) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [roomType, setRoomType] = useState('');

  const addBooking = () => {
    console.log(email, number, startDate, endDate, startTime, endTime, roomType);
  }

  return (
    <div className="flex flex-col items-center w-3/4 mx-auto p-4 rounded-lg border border-black">
      <h2 className="flex justify-center text-2xl font-bold mb-4">Add Booking</h2>
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          className="w-full p-2 border border-black rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2">
        <div className="mb-4">
          <label className="block mb-2">Room Type:</label>
          <select
            className="w-full p-2 border border-black rounded"
            onChange={(e) => setRoomType(e.target.value)}
          >
            {
              rooms.map((room, key) => (
                <option key={key} value={room.type}>{room.type}</option>
              ))
            }
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Room Number:</label>
          <select
            className="w-full p-2 border border-black rounded"
            onChange={(e) => setNumber(Number(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Start Date:</label>
          <input
            type='date'
            onChange={(date) => setStartDate(date)}
            className="w-full p-2 border border-black rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">End Date:</label>
          <input
            type='date'
            onChange={(date) => setEndDate(date)}
            className="w-full p-2 border border-black rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Start Time:</label>
          <select
            className="w-full p-2 border border-black rounded"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                {`${i.toString().padStart(2, '0')}:00`}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">End Time:</label>
          <select
            className="w-full p-2 border border-black rounded"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                {`${i.toString().padStart(2, '0')}:00`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={addBooking}>
        Submit
      </button>
    </div>
  );
}

export default AddBooking