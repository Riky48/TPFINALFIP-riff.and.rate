import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/login`, { email, password });
        return res.data
    } catch (err) {
        console.log('Error al iniciar sesión:', err);
        throw err;
    }
}

export const register = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/register`, { email, password });
        return res.data;
    } catch (err) {
        console.log('Error al registrar usuario:', err);
        throw err;
    }
}