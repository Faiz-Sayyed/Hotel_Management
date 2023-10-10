import React, { useState, useEffect } from 'react'
import RoomDetailsSection from './components/RoomDetailsSection';
import AddBooking from './components/AddBooking';
import axios from 'axios';
import './App.css';

const App = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/getBookings')
      .then((response) => {
        setAllBookings(response.data);
      })

    axios.get('http://localhost:5000/api/v1/getRooms')
      .then((response) => {
        setRooms(response.data);
      })
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl m-8">Hotel Management</div>

      <RoomDetailsSection rooms={rooms} setRooms={setRooms} />

      <AddBooking rooms={rooms} setRooms={setRooms} allBookings={allBookings} setAllBookings={setAllBookings} />

      <div>
        {
          allBookings.map((booking, key) => (
            <div key={key}>{booking.email}</div>
          ))
        }
      </div>
    </div>
  )
}

export default App;
