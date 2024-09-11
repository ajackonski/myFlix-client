import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';
import movieReducer from './slices/movieSlice';

const rootReducer = combineReducers({
  user: userReducer,
  movies: movieReducer,
});

export default rootReducer;
