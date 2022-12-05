import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import api from '../../model/api/api';
import { NavLink } from "react-router-dom";

const TrucksList = () => {
  const [trucks, setTrucks] = useState(api.TruckAPI.all());
  return (
    <>
      <Navbar />
      <>
        <div>
          <NavLink to='/vehicles/trollers'>Trollers</NavLink>
          <NavLink to='/vehicles/trucks'>Trucks</NavLink>
        </div>
        <div>{!trucks.length ? <></> :
          trucks.map((value, index) => {
            return (<div key={value.id}>
              <img src="https://www.gannett-cdn.com/-mm-/c4c53adca2900a14bb79e68d4b20551eeb795c12/c=0-31-1350-794/local/-/media/2016/10/31/DetroitFreePress/DetroitFreePress/636135335919148313-GFL-Truck.jpg?width=1200&disable=upscale&format=pjpg&auto=webp" alt="Truck img"></img>
              <div>{value.id}</div>
              <div>{value.status ? "Available" : "Unavailable"}</div>
            </div>)
          })}</div>
      </>
    </>

  )
}

export default TrucksList;