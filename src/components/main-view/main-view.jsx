import React, { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // State to store the selected movie
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://myflix-alex-8165b3d5447b.herokuapp.com/movies');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Set the selected movie in state
  };

  const handleBackClick = () => {
    setSelectedMovie(null); // Deselect the movie to go back to the movie list
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // If a movie is selected, show the detailed view
  if (selectedMovie) {
    return (
      <div>
        <h2>{selectedMovie.title}</h2>
        <img src={selectedMovie.imagePath} alt={selectedMovie.title} style={{ width: '300px', height: '450px' }} />
        <p><strong>Genre:</strong> {selectedMovie.genre.name}</p>
        <p><strong>Director:</strong> {selectedMovie.director.name}</p>
        <p><strong>Description:</strong> {selectedMovie.description}</p>
        <button onClick={handleBackClick}>Back to Movie List</button>
      </div>
    );
  }

  // Otherwise, show the movie list
  return (
    <div>
      <h1>Movie List</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={handleMovieClick} />
        ))}
      </div>
    </div>
  );
};

export default MainView;
