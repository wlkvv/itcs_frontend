import axios from 'axios';

export const api = axios.create(
    {
        baseURL: `http://176.57.215.76:8000/api`,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
);