import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../api';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(username, password);
        if (response.is_admin) {
            history.push("/admin");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
