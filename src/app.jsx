import React from "react";
import { Routes, Route } from "react-router-dom"; // Use Routes and Route without wrapping in Router
import MainView from "./components/main-view/main-view"; // Login/Signup View
import MovieView from "./components/movie-view/movie-view"; // MovieView
import ProfileView from "./components/profile-view/profile-view"; // Import ProfileView
import "./index.scss";

export const App = () => {
  return (
    <Routes>
      {/* Default route shows MainView (login/signup) */}
      <Route path="/" element={<MainView />} />
      {/* Movies route shows the movie view */}
      <Route path="/movies" element={<MovieView />} />
      {/* Profile route shows the profile view */}
      <Route path="/profile" element={<ProfileView />} />
    </Routes>
  );
};
