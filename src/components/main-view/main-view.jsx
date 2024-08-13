import React, { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

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
      <div>
        <LoginView onLoggedIn={onLoggedIn} />
        <SignupView onSignedUp={onSignedUp} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>{movies.map((m) => (<div key={m._id}>{m.Title}</div>))}</div>
    </div>
  );
}

