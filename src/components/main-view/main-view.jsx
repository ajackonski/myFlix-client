import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navbar, Nav, Row, Col, Button, Container } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import ProfileView from '../profile-view/profile-view';
import { getMovies, loginUser } from '../../../apiService';

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (token) {
      getMovies(token)
        .then(response => setMovies(response.data))
        .catch(err => console.error(err));
    }
  }, [token]);

  const handleLogin = (username, password) => {
    loginUser(username, password)
      .then(response => {
        setUser(username);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      })
      .catch(error => console.error('Login failed', error));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">myFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {!user ? (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                  <Nav.Link as={Button} onClick={handleLogout}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="main-view justify-content-md-center">
          {!user ? (
            <>
              <Col md={4}>
                <LoginView onLoggedIn={handleLogin} />
              </Col>
              <Col md={4}>
                <SignupView />
              </Col>
            </>
          ) : (
            <Col>
              <Routes>
                <Route path="/" element={<MovieCard movies={movies} />} />
                <Route path="/movies/:movieId" element={<MovieView />} />
                <Route path="/profile" element={<ProfileView user={user} token={token} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Col>
          )}
        </Row>
      </Container>
    </Router>
  );
};
