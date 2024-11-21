import React, { useState } from "react";
import axios from "../api";

const VotingPage = ({ token }) => {
  const [message, setMessage] = useState("");

  const handleVote = async (candidate) => {
    try {
      await axios.post(
        "/vote",
        { candidate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`You voted for ${candidate}`);
    } catch (error) {
      setMessage("You have already voted or an error occurred.");
    }
  };

  return (
    <div>
      <h2>Vote for Your Candidate</h2>
      <button onClick={() => handleVote("Candidate A")}>Candidate A</button>
      <button onClick={() => handleVote("Candidate B")}>Candidate B</button>
      <button onClick={() => handleVote("Candidate C")}>Candidate C</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VotingPage;
