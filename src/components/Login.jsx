import React, { useState } from "react";
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) {
            onLogin(username);
        }
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit} className='login-form'>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Start Quiz</button>
            </form>
        </div>
    );
};

export default Login;
