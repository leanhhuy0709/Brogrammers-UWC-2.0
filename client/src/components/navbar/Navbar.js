import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext';
import { NavLink, useNavigate } from 'react-router-dom';
const Navbar = () => {

  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
    navigate(0);
  }

  return (
    <div>
      <div className="logo-container">
        <NavLink to="/"><img src="https://seeklogo.com/images/R/recycle-logo-546BB839BA-seeklogo.com.jpg" alt="Logo here" /></NavLink>
      </div>
      <ul className="navlinks-container">
        <li>
          <NavLink to="/emp-list">Employee</NavLink>
          <NavLink to="/mcps">MCP</NavLink>
          <NavLink to="/vehicles/trucks">Vehicle</NavLink>
          <NavLink to="/assign">Assign task</NavLink>
          <NavLink to="/chat">Chat</NavLink>
        </li>
      </ul>
      <div className="user-container">
        <p>Hello, {user.firstName}</p>
        <NavLink to="/profile"><img src={user.avatar} alt="User avatar" /></NavLink>
        <button onClick={handleLogout}><i className="fa-sharp fa-solid fa-power-off"></i></button>
      </div>
    </div>
  )
}

export default Navbar;