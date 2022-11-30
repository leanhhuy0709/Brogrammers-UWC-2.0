import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import api from '../../model/api/api';
import { NavLink } from "react-router-dom";

const TrucksList = () => {
  const [trucks, setTrucks] = useState(api.CollectingVehicleAPI.all());
  return (
    <>
      <Navbar />
      <>
        <div>
          <NavLink to='/vehicles/trollers'>Controller</NavLink>
          <NavLink to='/vehicles/trucks'>Collect Vehicle</NavLink>
        </div>
        <div>{!trucks.length ? <></> :
          trucks.map((value, index) => {
            return (<div key={value.id}>
              <img src="" alt="Truck img"></img>
              <div>{value.id}</div>
              <div>{!value.status ? "Available" : "Unavailable"}</div>
            </div>)
          })}</div>
      </>
    </>

  )
}

export default TrucksList;