import { useContext, useState } from "react"
import GlobalContext from "../../context/GlobalContext"

const ChangePassword = () => {

  const user = useContext(GlobalContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="oldPasswordInput">Old password</label>
        <input type="password" id="oldPasswordInput" required placeholder="Old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <label htmlFor="newPasswordInput">New password</label>
        <input type="password" id="newPasswordInput" required placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <label htmlFor="oldPasswordInputAgain">Retype new password</label>
        <input type="password" id="oldPasswordInputAgain" required placeholder="Retype new password" value={newPasswordAgain} onChange={(e) => setNewPasswordAgain(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ChangePassword