import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import api from '../../model/api/api';
import { NavLink } from "react-router-dom";

const TrollersList = () => {
  const [trollers, setTrollers] = useState(api.TrollerAPI.all());
  return (
    <>
      <Navbar />
      <>
        <div>
          <NavLink to='/vehicles/trollers'>Controller</NavLink>
          <NavLink to='/vehicles/trucks'>Collect Vehicle</NavLink>
        </div>
        <div>{!trollers.length ? <></> :
          trollers.map((value, index) => {
            return (<div key={value.id}>
              <img src="" alt="Troller img"></img>
              <div>{value.id}</div>
              <div>{!value.status ? "Available" : "Unavailable"}</div>
            </div>)
          })}</div>
      </>
    </>

  )
}

export default TrollersList;