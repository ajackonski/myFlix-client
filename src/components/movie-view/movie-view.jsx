import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../../apiService';
import { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } from '../../redux/slices/movieSlice';
import { logoutUser } from '../../redux/slices/userSlice';
import MovieCard from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

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

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = '/'; // Redirect to main view
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav align-items-start"> {/* align-items-start for vertical alignment */}
              <li className="nav-item">
                <Link className="nav-link" to="/movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="movies-container">
        {movieList.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
  

export default MovieView;
