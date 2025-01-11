import axios from 'axios';

const api = axios.create({
 baseURL: 'http://localhost:3000/users',
//  baseURL: 'https://wise-money-blond.vercel.app/users',
});

export default api;