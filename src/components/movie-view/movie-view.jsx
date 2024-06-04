export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <h1>{movie.title}</h1>
        <img src={movie.image} alt={movie.title} />
        <p>{movie.description}</p>
        <p>{movie.genre}</p>
        <p>{movie.director}</p>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };