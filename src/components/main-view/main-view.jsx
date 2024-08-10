import React, { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
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
    console.log('Movie selected:', movie);
    setSelectedMovie(movie);
  };
  
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} onMovieClick={handleMovieClick} />
      ))}
    </div>
  );
};

export default MainView;

