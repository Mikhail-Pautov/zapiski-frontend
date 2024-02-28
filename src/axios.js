import axios from "axios";


const instance = axios.create({
    //baseURL: 'http://localhost:4444'
    //baseURL: process.env.REACT_APP_API_URL,
    baseURL: 'https://zapiski-backend-mikhail-789.amvera.io',
});



instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
});

export default instance;


