import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/'

const API = {
    // sendLoginRequest: (username, password) =>
    //     axios.post('/login', {username, password}),
    // sendSignupRequest: (username, password) =>
    //     axios.post('/signup', {username, password}),
    // sendEditUserRequest: (jwt, username, body) =>
    //     axios.put(`/user?username=${username}`,
    //         body, {
    //             headers: {Authorization: `Bearer ${jwt}`}
    //         }),
    // sendDeleteUserRequest: (jwt, username) =>
    //     axios.delete(`/user?username=${username}`,
    //         {
    //             headers: {Authorization: `Bearer ${jwt}`}
    //         }),
    getAllUsers: (jwt) =>
        axios.get('users', {headers: {Authorization: `Bearer ${jwt}`}})
}

export default API;