import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movieList: [],
  favoriteMovies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesStart: (state) => {
      state.loading = true;
    },
    fetchMoviesSuccess: (state, action) => {
      state.loading = false;
      state.movieList = action.payload;
    },
    fetchMoviesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addFavorite: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  addFavorite,
  removeFavorite,
} = movieSlice.actions;

export default movieSlice.reducer;
