import React, { useState } from "react";
import Login from "./components/login";
import VotingPage from "./components/VotingPage";
import AdminDashboard from "./components/AdminDashboard";
import "./styles.css";

const App = () => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (token, isAdmin) => {
    setToken(token);
    setIsAdmin(isAdmin);
  };

  return (
    <div className="App">
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : isAdmin ? (
        <AdminDashboard token={token} />
      ) : (
        <VotingPage token={token} />
      )}
    </div>
  );
};

export default App;
