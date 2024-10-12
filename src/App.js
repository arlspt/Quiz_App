// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Quiz from './components/Quiz';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <div>
      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <Quiz username={username} />
      )}
    </div>
  );
};

export default App;
