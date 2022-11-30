import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../model/api/api'
import Navbar from '../navbar/Navbar'
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

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
        <div>List of tasks </div>
        <div>
          <div><img src={employee.avatar} alt='avt'></img></div>
          <div>{employee.username}</div>
          <div>{employee.position ? "Collector" : "Janitor"}</div>
          <div>{!employee.status ? "Active" : "Offline"}</div>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>
                  RouterID
                  <span onClick={() => HandleOnSort("routeId", 0)}>
                    {reverse[0] ? <CaretDownFill />
                      : <CaretUpFill />}
                  </span>
                </th>
                <th>First MCP</th>
                <th>Last MCP</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
              {!tasks.length ? <></> :
                tasks.map((value, index) => {
                  return (<tr key={value.id}>
                    <td>{value.routeId}</td>
                    <td>{value.firstMCP}</td>
                    <td>{value.lastMCP}</td>
                    <td>{value.timestamp}</td>
                    <td></td>
                  </tr>)
                })}
            </tbody>
          </table>
        </div>
      </>
    </>
  )
}

export default EmployeeProfile;