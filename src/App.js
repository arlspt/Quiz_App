// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Quiz from './components/Quiz';

const App = () => {
  const [username, setUsername] = useState(''); //3. state menentukan sudah login/belum

  return ( //1. mengelola dua tampilan
    <div>
      {!username ? (
        <Login onLogin={setUsername} /> //2.pengguna belum login
      ) : (
        <Quiz username={username} />
      )}
    </div>
  );
};

export default App;
