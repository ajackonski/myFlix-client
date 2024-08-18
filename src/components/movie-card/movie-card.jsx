import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, addToFavorites }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button onClick={() => addToFavorites(movie._id)}>Favorite</Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;