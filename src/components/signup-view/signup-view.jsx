import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSignup } from '../../../apiService';
import { signupStart, signupSuccess, signupFailure } from '../../redux/slices/userSlice';

const SignupView = () => {
  const [Username, setUsername] = useState(''); 
  const [Password, setPassword] = useState(''); 
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Email validation function
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (Username === '' || Password === '' || Email === '' || Birthday === '') {
      setErrorMessage('All fields are required');
      return;
    }

    if (!validateEmail(Email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    if (Password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long');
      return;
    }

    // Clear error message if validation passes
    setErrorMessage('');

    // Ensure data matches API's expected fields
    const userData = { Username, Password, Email, Birthday };

    try {
      await userSignup(userData); // Call the API with the correct field names
      alert('Signup successful!');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
      <input
        type="text"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="date"
        value={Birthday}
        onChange={(e) => setBirthday(e.target.value)}
        placeholder="Birthday"
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupView;
