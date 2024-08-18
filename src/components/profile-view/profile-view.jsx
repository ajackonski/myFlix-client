import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { getUser, updateUser, deleteUser } from '../../../apiService';

export const ProfileView = ({ user, token }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user) {
      getUser(user, token)
        .then(response => {
          setUpdatedUser(response.data);
          setFavoriteMovies(response.data.FavoriteMovies);
        })
        .catch(error => console.error('Failed to fetch user data', error));
    }
  }, [user, token]);

  const handleUpdate = () => {
    updateUser(user, updatedUser, token)
      .then(() => alert('User updated successfully'))
      .catch(error => console.error('Failed to update user', error));
  };

  const handleDeregister = () => {
    deleteUser(user, token)
      .then(() => {
        alert('User deregistered successfully');
        // Additional cleanup (e.g., logout, redirect)
      })
      .catch(error => console.error('Failed to deregister user', error));
  };

  return (
    <div>
      <h1>Profile</h1>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control value={updatedUser.Username} onChange={(e) => setUpdatedUser({ ...updatedUser, Username: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control value={updatedUser.Email} onChange={(e) => setUpdatedUser({ ...updatedUser, Email: e.target.value })} />
        </Form.Group>
        <Button onClick={handleUpdate}>Update</Button>
        <Button variant="danger" onClick={handleDeregister}>Deregister</Button>
      </Form>
      <h2>Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie) => (
          <Card key={movie._id}>
            <Card.Body>{movie.Title}</Card.Body>
          </Card>
        ))
      ) : (
        <p>No favorite movies added.</p>
      )}
    </div>
  );
};

export default ProfileView;
