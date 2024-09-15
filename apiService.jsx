import axios from 'axios';
import qs from 'qs';

const API_URL = 'https://myflix-alex-8165b3d5447b.herokuapp.com';

// Signup
export const userSignup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json' // Ensure correct content type
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error during signup API call:', error);
    throw error;
  }
};

// Login
export const userLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, qs.stringify({
      Username: credentials.username,
      Password: credentials.password,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Use URL-encoded format if required
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Movies
export const getMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Movie by Title
export const getMovieByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/movies/${title}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update User Info
export const updateUserInfo = async (username, userData, token) => {
  try {
    const response = await axios.put(`/${API_URL}/users/${username}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete User
export const deleteUser = async (username, token) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add movie to favorites
export const addFavoriteMovie = async (username, movieID, token) => {
  try {
    const response = await axios.post(
      `${API_URL}users/${username}/movies/${movieID}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove movie from favorites
export const removeFavoriteMovie = async (username, movieID, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}users/${username}/movies/${movieID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
