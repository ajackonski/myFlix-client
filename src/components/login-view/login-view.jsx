import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { loginUser } from '../../../apiService';

export function LoginView({ onLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          onLoggedIn(username, password);
        } else {
          setError('Invalid username or password');
        }
      })
      .catch(() => setError('Something went wrong'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Form>
  );
}

export default LoginView;
