import React, { useState } from 'react';

const MovieCard = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Controls expansion of movie info
  const [isFavorite, setIsFavorite] = useState(false); // Controls favorite status

  // Toggle the expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle the favorite state
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="movie-card">
      <img src={movie.imagePath} alt={movie.title} className="movie-image" />
      <h3 className="movie-title">{movie.title}</h3>

      {/* Expand button */}
      <button className="expand-btn" onClick={toggleExpand}>
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>

      {/* Expanded movie information */}
      {isExpanded && (
        <div className="movie-info">
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Genre:</strong> {movie.genre.name}</p>
          <p><strong>Director:</strong> {movie.director.name}</p>
        </div>
      )}

      {/* Favorite button */}
      <button className="favorite-btn" onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;
