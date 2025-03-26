import axios from "axios";

const API_URL = "https://cinemaguide.skillbox.cc";

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;