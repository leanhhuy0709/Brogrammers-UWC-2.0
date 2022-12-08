import { useContext, useState } from "react"
import GlobalContext from "../../context/GlobalContext"
import { validateChangePassword } from "../../controller/controller";

const ChangePassword = () => {

  const {user} = useContext(GlobalContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    setErrorMessage("")
    setMessage("")
    const {msg, status} = validateChangePassword(user, oldPassword, newPassword, newPasswordAgain);
    if (status === 1) {
      setErrorMessage("");
      setMessage(msg);
    }
    else {
      setErrorMessage(msg);
    }
  }

  return (
    <div className="container">
      <form>
        <label htmlFor="oldPasswordInput">Old password</label>
        <input type="password" id="oldPasswordInput" required placeholder="Old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <label htmlFor="newPasswordInput">New password</label>
        <input type="password" id="newPasswordInput" required min="4" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <label htmlFor="oldPasswordAgainInput">Retype new password</label>
        <input type="password" id="oldPasswordAgainInput" required placeholder="Retype new password" value={newPasswordAgain} onChange={(e) => setNewPasswordAgain(e.target.value)} />
        {errorMessage ? <>
          <p className="error-message">{errorMessage}</p>
        </> : <>
          {message ? <p className="success-message">{message}</p> : null}
        </>}
        <button onClick={(e) => handleChangePassword(e)}>Save</button>
      </form>
    </div>
  )
}

export default ChangePassword