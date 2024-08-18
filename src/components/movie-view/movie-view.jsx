import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieView = ({ movie, onBackClick, addToFavorites }) => {
  return (
    <div>
      <h1>{movie.Title}</h1>
      <p>{movie.Description}</p>
      <Link to="/">
        <Button onClick={onBackClick}>Back</Button>
      </Link>
      <Button onClick={() => addToFavorites(movie._id)}>Favorite</Button>
    </div>
  );
};

export default MovieView;