import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../model/api/api'
import Navbar from '../navbar/Navbar'
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import "./employeeProfile.css"

const EmployeeProfile = () => {
  const [id] = useState(useParams().id);
  const [employee] = useState(api.CollectorAPI.get_by_id(id) || api.JanitorAPI.get_by_id(id));
  const [reverse, setReverse] = useState([false]);
  const [tasks, setTasks] = useState(() => {
    const allTask = api.ActivityAPI.all();
    const employeeTasks = allTask.filter((value, index) => {
      return value.employeesId.includes(id);
    })
    return employeeTasks.map((value, index) => {
      const route = api.RouteAPI.get_by_id(value.routeId);
      value["firstMCP"] = route.MCPIdList[0];
      value["lastMCP"] = route.MCPIdList.at(-1);
      return value;
    })
  })


  const HandleOnSort = (property, idx) => {
    const sortedArray = [...tasks].sort(function (a, b) {
      var x = a[property]; var y = b[property];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse[idx]) sortedArray.reverse();
    const newReverse = [...reverse]
    newReverse[idx] = !reverse[idx]
    setReverse(newReverse)
    setTasks(sortedArray);
  }

  return (
    <>
      <Navbar></Navbar>
      <>
        <div className = "title"><h1>List of tasks </h1></div>
        <div className = 'container-2 border-blue'>
          <div className = 'profile-image center'>
            <img className = 'rounded-image-large' src={employee.avatar} alt='avt'/>
          </div>
          <div className = 'profile-text'>
            <h4>{employee.username}</h4>
            <p>{employee.position ? "Collector" : "Janitor"}</p>
            <p>Available?_?</p>
            <p>{!employee.status ? "Active" : "Offline"}</p>
            
          </div>
        </div>
        <table className = 'table'>
          <tbody>
            <tr>
              <th className = 'table-item'>
                RouteID
                <span onClick={() => HandleOnSort("routeId", 0)}>
                  {reverse[0] ? <CaretDownFill />
                    : <CaretUpFill />}
                </span>
              </th>
              <th className = 'table-item'>First MCP</th>
              <th className = 'table-item'>Last MCP</th>
              <th className = 'table-item'>Time</th>
              <th className = 'table-item'>Status</th>
              <th/>
            </tr>
            {!tasks.length ? <></> :
              tasks.map((value, index) => {
                return (<tr key={value.id}>
                  <td className = 'table-item center'>{value.routeId}</td>
                  <td className = 'table-item center'>{value.firstMCP}</td>
                  <td className = 'table-item center'>{value.lastMCP}</td>
                  <td className = 'table-item center'>{value.timestamp}</td>
                  <td className = 'table-item center'>Finish ?_?</td>
                </tr>)
              })}
          </tbody>
        </table>
      </>
    </>
  )

}

export default EmployeeProfile;
