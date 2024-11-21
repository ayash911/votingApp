import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await registerUser(username, password);
        setMessage(response.message);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
