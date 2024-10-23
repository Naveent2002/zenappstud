// src/App.js

import React, { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import TaskManager from './TaskManager';
import Login from './Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="app-container">
      {user ? <TaskManager user={user} /> : <Login />}
    </div>
  );
}

export default App;
