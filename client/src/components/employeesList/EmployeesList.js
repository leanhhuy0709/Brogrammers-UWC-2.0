import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import api from '../../model/api/api';
import './employeesList.css';
import { NavLink } from "react-router-dom";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

const EmployeesList = () => {
  const calTask = (id) => {
    const allTask = api.ActivityAPI.all();
    const employeeTasks = allTask.filter((value, index) => {
      return value.employeesId.includes(id);
    })
    return employeeTasks.length;
  }

  const [reverse, setReverse] = useState([false, false, false]);
  const [showMenu, setShowMenu] = useState(false);
  const [employeeId, setEmployeeId] = useState(0);
  const [employees, setEmployees] = useState(() => {
    const allEmployees = [...api.CollectorAPI.all(), ...api.JanitorAPI.all()];
    return allEmployees.map((value, index) => {
      value["numberOfTasks"] = calTask(value.id);
      return value;
    })
  });

  const HandleOnShow = (id) => {
    setShowMenu(true);
    setEmployeeId(id);
  }

  const HandleOnHide = () => {
    setShowMenu(false);
    setEmployeeId(0);
  }

  const HandleOnSort = (property, idx) => {
    const sortedArray = [...employees].sort(function (a, b) {
      var x = a[property]; var y = b[property];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse[idx]) sortedArray.reverse();
    const newReverse = [false, false, false]
    newReverse[idx] = !reverse[idx]
    setReverse(newReverse)
    setEmployees(sortedArray);
  }


  return (
    <>
      <Navbar />
      <>
        <div>Employees</div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                UserName
                <span onClick={() => HandleOnSort("username", 0)}>
                  {reverse[0] ? <CaretDownFill />
                    : <CaretUpFill />}
                </span>
              </th>
              <th>Dept</th>
              <th>
                Status
                <span onClick={() => HandleOnSort("status", 1)}>
                  {reverse[1] ? <CaretDownFill />
                    : <CaretUpFill />}
                </span>
              </th>
              <th>
                Number of tasks
                <span onClick={() => HandleOnSort("numberOfTasks", 2)}>
                  {reverse[2] ? <CaretDownFill />
                    : <CaretUpFill />}
                </span>
              </th>
              <th></th>
            </tr>
            {!employees.length ? <></> :
              employees.map((value, index) => {
                return (<tr key={value.id}>
                  <td><img src={value.avatar} alt='avt'></img></td>
                  <td>{value.username}
                  </td>
                  <td>{value.position ? "Collector" : "Janitor"}</td>
                  <td>{!value.status ? "Active" : "Not active"}</td>
                  <td>{value.numberOfTasks}</td>
                  <td >
                    {(showMenu && employeeId === value.id) ? (<div>
                      <div onClick={() => HandleOnHide()}>...</div>
                      <NavLink to={"/chat/" + employeeId}>Chat</NavLink>
                      <NavLink to={"/emp-info/" + employeeId}>Profile</NavLink>
                    </div>) : <div onClick={() => HandleOnShow(value.id)}>...</div>}
                  </td>
                </tr>)
              })}
          </tbody>
        </table>
      </>
    </>

  )
}

export default EmployeesList;