import React, { useState } from "react";
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    //3. input form dikelola dengan menggunakan state username
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) {
            onLogin(username); //4. ketika pengguna men-submit, dikirim ke parent komponen
        }
    };

    return ( //2. mengirim nama pengguna ke App
        <div className='login-container'>
            <form onSubmit={handleSubmit} className='login-form'>
                <h2>Login</h2>
                <input //1. pengguna memasuka nama untuk memulai kuis
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
