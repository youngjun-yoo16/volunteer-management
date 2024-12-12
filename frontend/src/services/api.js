import axios from 'axios';

const api = axios.create({
  baseURL: 'https://volunteer-management-2rku.onrender.com/',  // Ensure this is correct
});

export default api;

