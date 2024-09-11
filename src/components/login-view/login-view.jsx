// login-view.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../apiService';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/userSlice';

const LoginView = () => {
  const [username, setUsername] = useState(''); // Lowercase key
  const [password, setPassword] = useState(''); // Lowercase key
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const data = await userLogin({ username, password }); // Ensure lowercase keys are passed
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginView;
