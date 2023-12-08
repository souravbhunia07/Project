import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('/api/v1//login', { email, password });
      const { token, user } = response.data;

      // You can save the token and user data to your state or context for authentication purposes
      console.log('Logged in:', user);
    } catch (error) {
      console.error('Login error:', error.response.data.error);
    }
  };

  return (
    <div className='login-container'>
      <div className='image-container'>
      </div>
      <div className='form-container'>
        <div className='form-box'>
          <div className='form-header'>
            <span>Sign In</span>
          </div>
          <form onSubmit={handleLogin}>
            <div className='input-container'>
              <AlternateEmailIcon />
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='input-container'>
              <LockPersonIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className='submit-button'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
