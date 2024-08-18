import React, { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import  SignupView  from '../signup-view/signup-view';
import { Container, Row, Col, Button } from 'react-bootstrap';

export function MainView() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchMovies(token);
    }
  }, []);

  const fetchMovies = (token) => {
    fetch('https://myflix-alex-8165b3d5447b.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  };

  const onLoggedIn = (token) => {
    setUser(true);
    fetchMovies(token);
  };

  const onSignedUp = (token) => {
    setUser(true);
    fetchMovies(token);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (!user) {
    return (
      <Container>
        <Row>
          <Col>
            <LoginView onLoggedIn={onLoggedIn} />
          </Col>
          <Col>
            <SignupView onSignedUp={onSignedUp} />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <Button onClick={handleLogout} variant="primary">Logout</Button>
        </Col>
      </Row>
      <Row>
        {movies.map((m) => (
          <Col md={4} key={m._id} className="mb-4">
            <div>{m.Title}</div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}


