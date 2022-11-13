import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const user = {}

  return (
    <Router>
      {user ? <ProtectedRoutes> </ProtectedRoutes> : <Login />}
      <Route path="/login" element={user ? <Home /> : <Login />}/>
      <Route path="/forgot" element={user ? <Home /> : <ForgotPassword />}/>
      <Route path="/reset" element={user ? <Home /> : <ResetPassword />}/>
      <Route path="/*" element={<ErrorPage />}/>
    </Router>
  );
}

export default App;
