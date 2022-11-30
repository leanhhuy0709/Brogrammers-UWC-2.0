import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
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
        <img src="logo.jpg" alt="Logo here" />
      </div>
      <ul className="navlinks-container">
        <li>
          <a href="/emp-list">Employee</a>
          <a href="/mcps">MCP</a>
          <a href="/vehicles/trucks">Vehicle</a>
          <a href="/assign">Assign task</a>
          <a href="/">Chat</a> {/* what about the chat? */}
        </li>
      </ul>
      <div className="user-container">
        <p>Hello, {user.firstName}</p>
        <a href="/profile"><img src={user.avatar} alt="User avatar" /></a>
        <button onClick={handleLogout}><i className="fa-sharp fa-solid fa-power-off"></i></button>
      </div>
    </div>
  )
}

export default Navbar;