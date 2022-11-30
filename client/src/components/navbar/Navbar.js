import React from 'react'
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <NavLink to='/'><img src='' alt='logo'></img></NavLink>
      <NavLink to='/emp-list'>Employee</NavLink>
      <NavLink to='/mcps'>MCP</NavLink>
      <NavLink to='/vehicles/trollers'>Vehicle</NavLink>
      <NavLink to='/assign'>Assign Task</NavLink>
    </div>
  )
}

export default Navbar;