import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import api, { mcpAPI } from '../../model/api/api';
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";



const MCPsList = () => {
  const [MCPs, setMCPs] = useState(api.mcpAPI.all());
  const [onlyFull, setOnlyFull] = useState(false)
  const [reverse, setReverse] = useState([false, false, false]);

  const HandleOnSort = (property, idx) => {
    const sortedArray = [...MCPs].sort(function (a, b) {
      var x = a[property]; var y = b[property];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse[idx]) sortedArray.reverse();
    const newReverse = [false]
    newReverse[idx] = !reverse[idx]
    setReverse(newReverse)
    setMCPs(sortedArray);
  }

  const HandleOnFilterFull = () => {
    setOnlyFull(!onlyFull);

    if (onlyFull) {
      try {
        if (!api.mcpAPI.has_property('percentage')) return;
        setMCPs(api.mcpAPI.filter({ "percentage": 100 }));
      } catch (error) {
        setMCPs([]);
      }
    } else {
      setMCPs(api.mcpAPI.all())
    }
  }
  console.log(MCPs)

  return (
    <>
      <Navbar />
      <>
        <div>
          <table>
            <tbody>
              <tr>
                <th>MCP ID</th>
                <th>MCP name</th>
                <th>Capacity
                  <span onClick={() => HandleOnSort("percentage", 0)}>
                    {reverse[0] ? <CaretDownFill />
                      : <CaretUpFill />}
                  </span>
                </th>
                <th>Last visited</th>
              </tr>
              {MCPs.map((value, index) => {
                return (
                  <tr>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    {value.percentage <= 40 ?
                      <td>{value.percentage}</td> :
                      value.percentage <= 60 ?
                        <td>{value.percentage}</td> :
                        value.percentage <= 80 ?
                          <td>{value.percentage}</td> :
                          <td>{value.percentage}</td>}
                    <td>{value.lastCollected}</td>
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

export default MCPsList