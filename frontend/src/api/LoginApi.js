import axiosClient from "./axiosClient";

const login = (username, password) => {

    const parameters = {
        username: username,
        password: password
    }

    return axiosClient.get(`/login`, { params: parameters });
};

// export
const api = { login }
export default api;