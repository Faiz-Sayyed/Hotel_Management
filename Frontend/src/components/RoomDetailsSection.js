import React, { useState } from 'react'
import axios from 'axios'

const RoomDetailsSection = ({ rooms, setRooms }) => {
  const [addingRoom, setAddingRoom] = useState(false);
  const [editingRoom, setEditingRoom] = useState(0);
  const [type, setType] = useState('');
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState(0);

  const addRoom = async () => {
    setAddingRoom(false);

    if (!type || !number || !price) {
      return;
    }

    await axios.post('http://localhost:5000/api/v1/addRoom', {
      type: type,
      number: number,
      price: price
    })
      .then((response) => {
        setRooms(response.data);
      })

    setType('');
    setNumber(0);
    setPrice(0);
  }

  const editRoomDetails = (roomID) => {
    setEditingRoom(roomID);
  }

  const deleteRoom = async (roomID) => {
    await axios.post('http://localhost:5000/api/v1/deleteRoom', {
      id: roomID,
    })
      .then((response) => {
        setRooms(response.data);
      })
  }

  const submitDetails = async (roomID) => {
    setEditingRoom(0);

    if (!type || !number || !price) {
      return;
    }

    await axios.post('http://localhost:5000/api/v1/updateRooms', {
      id: roomID,
      type: type,
      number: number,
      price: price
    })
      .then((response) => {
        setRooms(response.data);
      })

    setType('');
    setNumber(0);
    setPrice(0);
  }

  return (
    <div className='flex flex-col justify-center w-4/5 m-5 border border-black'>
      <div className='grid grid-cols-3 gap-x-20'>
        {
          rooms.map((room) => (
            <div key={room._id} className='w-72'>
              {
                editingRoom === room._id ?
                  <>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-row">
                        <div>Type:</div>
                        <input type="text" className='w-20 border border-black' onChange={(e) => { setType(e.target.value) }} />
                      </div>
                      <div onClick={() => submitDetails(room._id)} className="hover:cursor-pointer">Save</div>
                    </div>
                    <div className='flex flex-row'>
                      <div>Number of Room:</div>
                      <input type="number" className='w-20 border border-black' onChange={(e) => { setNumber(e.target.value) }} />
                    </div>
                    <div>
                      <div className='flex flex-row'>
                        <div>Price:</div>
                        <input type="number" className='w-20 border border-black' onChange={(e) => { setPrice(e.target.value) }} />
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div className="flex justify-between items-center">
                      <div className='text-xl'>
                        Type: {room.type}
                      </div>
                      <div className='flex justify-between w-20'>
                        <div onClick={() => editRoomDetails(room._id)} className="hover:cursor-pointer">Edit</div>
                        <div onClick={() => deleteRoom(room._id)} className="hover:cursor-pointer">Delete</div>
                      </div>
                    </div>
                    <div>
                      Number of Room: {room.number}
                    </div>
                    <div>
                      Price: {room.price}
                    </div>
                  </>
              }
            </div>
          ))
        }
      </div>
      <div className='flex justify-center my-5'>
        {
          (addingRoom) ? <div className='flex flex-col items-center'>
            <div className='flex justify-center border border-black p-2 w-20 hover:cursor-pointer' onClick={addRoom}>Add</div>
            <div className='mt-5'>
              <div className='flex'>
                <div>Type: </div>
                <input type="text" className='w-20 border border-black' onChange={(e) => { setType(e.target.value) }} />
              </div>
              <div className='flex'>
                <div>Number of Rooms: </div>
                <input type="text" className='w-20 border border-black' onChange={(e) => { setNumber(e.target.value) }} />
              </div>
              <div className='flex'>
                <div>Price: </div>
                <input type="text" className='w-20 border border-black' onChange={(e) => { setPrice(e.target.value) }} />
              </div>
            </div>
          </div> : <div>
            <div className='flex justify-center border border-black p-2 w-40 hover:cursor-pointer' onClick={() => setAddingRoom(true)}>Add New Room</div>
          </div>
        }
      </div>
    </div>
  );
}

export default RoomDetailsSection