import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../../apiService';
import { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } from '../../redux/slices/movieSlice';
import MovieCard from '../movie-card/movie-card';

const MovieView = () => {
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMoviesStart());
    getMovies()
      .then((data) => {
        dispatch(fetchMoviesSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchMoviesFailure(err.message));
      });
  }, [dispatch]);

  return (
    <div className="movies-container">
      {movieList.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieView;
