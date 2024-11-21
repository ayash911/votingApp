import React, { useState } from 'react';
import { voteUser } from '../api';

const VoteForm = () => {
    const [choice, setChoice] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await voteUser(choice);
        setMessage(response.message);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={choice} onChange={(e) => setChoice(e.target.value)}>
                    <option value="">Select your vote</option>
                    <option value="Option1">Option 1</option>
                    <option value="Option2">Option 2</option>
                </select>
                <button type="submit">Vote</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VoteForm;
