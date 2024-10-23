// src/Login.js

import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './styles/Login.css';

const Login = () => {
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      await signInWithPopup(auth, provider);
      console.log('User signed in');
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to Task Manager</h2>
      <button onClick={googleSignIn} className="login-button">Sign In with Google</button>
    </div>
  );
};

export default Login;
