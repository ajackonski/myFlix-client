import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Thing",
      description: "test",
      genre: "Horror",
      image: "https://upload.wikimedia.org/wikipedia/en/e/e3/The_Thing_%281982_film%29.png",
      director: "John Carpenter",
    },
    {
      id: 2,
      title: "Starship Troopers",
      description: "test",
      genre: "Sci-fi",
      image: "test",
      director: "Paul Verhoeven",
    },
    {
      id: 3,
      title: "Seven Samurai",
      description: "test",
      genre: "Drama",
      image: "test",
      director: "Akira Kurosawa",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};