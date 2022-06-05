import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/'

const API = {
    
    sendLoginRequest: (username, password) =>
        axios.post('/login', {username, password}),
    sendSignupRequest: (username, email, phone, amount, password) =>
        axios.post('/signup', {username, email, phone, amount, password}),

    getAllUsers: () =>
        axios.get('users')
}

export default API;