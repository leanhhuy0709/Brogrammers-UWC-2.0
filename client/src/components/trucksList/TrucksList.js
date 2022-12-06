import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import api from '../../model/api/api';
import { NavLink } from "react-router-dom";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

const TrucksList = () => {
  const [reverse, setReverse] = useState([false]);
  const getNameById = (id) => {
    const allCollector = api.CollectorAPI.all();
    const collector = allCollector.find((value) => {
      return value.id === id;
    })
    if (!collector) return "-";
    return collector.firstName + " " + collector.lastName;
  }
  const [trucks, setTrucks] = useState(() => {
    const allTruck = api.TruckAPI.all();
    return allTruck.map((value, index) => {
      value["userName"] = getNameById(value.uesdById);
      return value;
    })
  });
  const HandleOnSort = (property, idx) => {
    const sortedArray = [...trucks].sort(function (a, b) {
      var x = a[property]; var y = b[property];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse[idx]) sortedArray.reverse();
    const newReverse = [false]
    newReverse[idx] = !reverse[idx]
    setReverse(newReverse)
    setTrucks(sortedArray);
  }
  return (
    <>
      <Navbar />
      <>
        <div>
          <NavLink to='/vehicles/trollers'>Trollers</NavLink>
          <NavLink to='/vehicles/trucks'>Trucks</NavLink>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Truck ID</th>
                <th>Used by</th>
                <th>Location</th>
                <th>Status
                  <span onClick={() => HandleOnSort("status", 0)}>
                    {reverse[0] ? <CaretDownFill />
                      : <CaretUpFill />}
                  </span>
                </th>
              </tr>
              {trucks.map((value, index) => {
                return (
                  <tr>
                    <td>{value.id}</td>
                    <td>{value.userName}</td>
                    <td>{value.location}</td>
                    <td>{!value.status ? "Available" : "In use"}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </>
    </>

  )
}

export default TrucksList;