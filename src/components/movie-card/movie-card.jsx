import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
};

// Adding PropTypes for the component
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string
    }).isRequired,
    description: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
