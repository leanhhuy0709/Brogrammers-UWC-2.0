import React, { useContext, useState } from 'react'
import GlobalContext from '../../context/GlobalContext'
import ChangePassword from '../changePassword/ChangePassword';
import {useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Profile = () => {

  const navigate = useNavigate();
  
  const {formatDateToInput, user, setUser} = useContext(GlobalContext);
  const [fname, setFname] = useState(user.firstName);
  const [lname, setLname] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [bdate, setBdate] = useState(formatDateToInput(user.birthDate));
  const [id, setId] = useState(user.id);
  const [username, setUsername] = useState(user.username);
  const [memberSince, setMemberSince] = useState(formatDateToInput(user.memberSince));
  const [password, setPassword] = useState(user.password);
  const [showChange, setShowChange] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({...user, username, email, firstName: fname, lastName: lname, birthDate: bdate});
    navigate("/profile");
  }

  return (
    <>
    <Navbar />
    <main className="container">
      <div className="image-name-container">
        <img src={user.avatar} alt="Back officer avatar" />
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="form-container" >
        <label htmlFor="firstNameInput">First name</label>
        <input type="text" id="firstNameInput" required value={fname} onChange={(e) => setFname(e.target.value)} />

        <label htmlFor="lastNameInput">Last name</label>
        <input type="text" id="lastNameInput" required value={lname} onChange={(e) => setLname(e.target.value)} />

        <label htmlFor="emailInput">Email</label>
        <input type="email" id="emailInput" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="bdateInput">Birth date</label>
        <input type="date" id="bdateInput" required value={bdate} onChange={(e) => setBdate(e.target.value)} />

        <label htmlFor="idInput">ID</label>
        <input type="text" id="idInput" required disabled value={id} />

        <label htmlFor="usernameInput">Username</label>
        <input type="text" id="usernameInput" required value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="memberSinceInput">Member since</label>
        <input type="date" id="memberSinceInput" required disabled value={memberSince} />

        {showChange ? <ChangePassword showChange={showChange} setShowChange={setShowChange} /> : <>
          <label htmlFor="passwordInput">Password</label>
          <input type="password" id="passwordInput" required disabled value={password} />
          <button onClick={() => setShowChange(true)}>Change</button>
        </>}

        <button type="submit">Save changes</button>
      </form>
    </main>
    </>
  )
}

export default Profile