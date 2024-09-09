import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

export function SignupView({ onSignedUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert date format from mm-dd-yyyy to yyyy-mm-dd
    const [yyyy, mm, dd] = birthday.split('-');
    const formattedBirthday = `${yyyy}/${mm}/${dd}`;

    const user = { 
      Username: username, 
      Password: password, 
      Email: email, 
      Birthday: formattedBirthday 
    };
    
    console.log(user);

    axios.post('https://myflix-alex-8165b3d5447b.herokuapp.com/users', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 201) {  // Assuming the server returns a 201 status for a successful creation
        onSignedUp();
      } else {
        setError('Failed to register');
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.includes('duplicate key error')) {
        setError('Username is already taken. Please choose another.');
      } else {
        setError('Something went wrong');
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formSignupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </Form.Group>

      <Form.Group controlId="formSignupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </Form.Group>

      <Form.Group controlId="formSignupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group controlId="formSignupBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Sign Up
      </Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Form>
  );
}

export default SignupView;
