import PropTypes from 'prop-types';

const MovieCard = ({ movie, onMovieClick }) => {
    console.log('MovieCard received onMovieClick:', onMovieClick);

    return (
      <div
        onClick={() => {
          console.log('Movie clicked:', movie);
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
};

export default MovieCard;

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

