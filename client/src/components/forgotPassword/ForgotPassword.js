import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailSent = () => {

  const navigate = useNavigate();
  const resendEmail = () => {
    navigate(0);
  }

  return (
    <div className="container">
      <h1>Email sent.</h1>
      <p>If the email you entered is valid, you should receive an email with a link to reset your password shortly. Check your <strong>"Spam"</strong> folder if you can't see the email.</p>
      <h6>Did not receive the email?</h6>
      <button onClick={() => resendEmail()}>Resend Email</button>
    </div>
  )
}

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendEmail = () => {
    console.log("Email sent!");
    setSent(true);
  }
  const resendEmail = () => {
    navigate(0);
  }

  return (
    sent ? (<EmailSent />) : (<div className="container">
    <h1>Forgot password</h1>
    <p>Enter your email below. You will receive a email with a link to reset your password.</p>
    <form onSubmit={(e) => handleSendEmail(e)}>
      <label htmlFor="emailInput">Email</label>
      <input
        required
        type="email"
        id="emailInput"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  </div>)
  )
}

export default ForgotPassword