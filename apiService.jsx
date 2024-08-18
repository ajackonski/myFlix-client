import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'https://myflix-alex-8165b3d5447b.herokuapp.com';

export const loginUser = (username, password) => {
  return axios.post(`${apiUrl}/login`, {
    Username: username,
    Password: password,
  });
};

export const getMovies = (token) => {
  return axios.get(`${apiUrl}/movies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUser = (username, token) => {
  return axios.get(`${apiUrl}/users/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = (username, data, token) => {
  return axios.put(`${apiUrl}/users/${username}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = (username, token) => {
  return axios.delete(`${apiUrl}/users/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
