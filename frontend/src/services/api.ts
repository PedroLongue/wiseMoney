import axios from 'axios';

const api = axios.create({
 baseURL: 'http://localhost:3000/users',
});

export default api;