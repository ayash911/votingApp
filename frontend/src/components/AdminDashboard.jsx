import React, { useEffect, useState } from "react";
import axios from "../api";

const AdminDashboard = ({ token }) => {
  const [results, setResults] = useState({});

  const fetchResults = async () => {
    try {
      const res = await axios.get("/results", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(res.data);
    } catch (error) {
      alert("Failed to fetch results.");
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Live Voting Results</h3>
      {Object.keys(results).length > 0 ? (
        <ul>
          {Object.entries(results).map(([candidate, count]) => (
            <li key={candidate}>
              {candidate}: {count} votes
            </li>
          ))}
        </ul>
      ) : (
        <p>No votes yet.</p>
      )}
      <button onClick={fetchResults}>Refresh Results</button>
    </div>
  );
};

export default AdminDashboard;
