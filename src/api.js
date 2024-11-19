import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const recoverPassword = async (email) => {
  return axios.post(`${API_URL}/recover-password`, { email });
};
