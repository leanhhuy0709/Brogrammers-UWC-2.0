import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const user = {};

  return (
    <Router>
      {user ? (
        <ProtectedRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/emp-list" element={<EmployeesList />} />
          <Route path="/emp-info/:id" element={<EmployeeProfile />} />
          <Route path="/assign" element={<AssignTask />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/vehicle-list" element={<VehiclesList />} />
          <Route path="/mcp-list" element={<MCPsList />} />
        </ProtectedRoutes>
      ) : (
        <Login />
      )}
      <Route path="/login" element={user ? <Home /> : <Login />} />
      <Route path="/forgot" element={user ? <Home /> : <ForgotPassword />} />
      <Route path="/reset" element={user ? <Home /> : <ResetPassword />} />
      <Route path="/*" element={<ErrorPage />} />
    </Router>
  );
}

export default App;
