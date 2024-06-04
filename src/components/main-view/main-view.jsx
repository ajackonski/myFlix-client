import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Thing",
      description: "In remote Antarctica, a group of American research scientists are disturbed at their base camp by a helicopter shooting at a sled dog. When they take in the dog, it brutally attacks both human beings and canines in the camp and they discover that the beast can assume the shape of its victims. A resourceful helicopter pilot (Kurt Russell) and the camp doctor (Richard Dysart) lead the camp crew in a desperate, gory battle against the vicious creature before it picks them all off, one by one.",
      genre: "Horror",
      image: "https://upload.wikimedia.org/wikipedia/en/e/e3/The_Thing_%281982_film%29.png",
      director: "John Carpenter",
    },
    {
      id: 2,
      title: "Starship Troopers",
      description: "In the distant future, the Earth is at war with a race of giant alien insects. Little is known about the Bugs except that they are intent on the eradication of all human life. But there was a time before the war... A Mobile Infantry travels to distant alien planets to take the war to the Bugs. They are a ruthless enemy with only one mission: Survival of their species no matter what the cost...",
      genre: "Sci-fi",
      image: "https://upload.wikimedia.org/wikipedia/en/d/df/Starship_Troopers_-_movie_poster.jpg",
      director: "Paul Verhoeven",
    },
    {
      id: 3,
      title: "Seven Samurai",
      description: "A samurai answers a village's request for protection after he falls on hard times. The town needs protection from bandits, so the samurai gathers six others to help him teach the people how to defend themselves, and the villagers provide the soldiers with food. A giant battle occurs when 40 bandits attack the village.",
      genre: "Drama",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Seven_Samurai_poster.jpg/800px-Seven_Samurai_poster.jpg",
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