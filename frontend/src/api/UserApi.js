import axiosClient from "./axiosClient";

const url = "/users";

const existsByEmail = (email) => {
    return axiosClient.get(`${url}/email/${email}`);
};

const existsByUsername = (username) => {
    return axiosClient.get(`${url}/userName/${username}`);
};

const create = (firstname, lastname, username, email, password) => {

    const body = {
        firstName: firstname,
        lastName: lastname,
        userName: username,
        email: email,
        password: password
    }

    return axiosClient.post(url, body);
};

const resendEmailToActiveAccount = (email) => {

    const parameters = {
        email: email
    }

    return axiosClient.get(`${url}/userRegistrationConfirmRequest`, { params: parameters });
};

const requestResetPassword = (email) => {

    const parameters = {
        email: email
    }

    return axiosClient.get(`${url}/resetPasswordRequest`, { params: parameters });
};

const resendEmailToResetpassword = (email) => {

    const parameters = {
        email: email
    }

    return axiosClient.get(`${url}/resendResetPassword`, { params: parameters });
};

const resetPassword = (token, newPassword) => {

    const parameters = {
        token: token,
        newPassword: newPassword
    }

    return axiosClient.get(`${url}/resetPassword`, { params: parameters });
};

const getProfile = () => {
    return axiosClient.get(`${url}/profile`);
};

const updateProfile = (avatarUrl) => {

    const body = {
        avatarUrl: avatarUrl
    }

    return axiosClient.put(`${url}/profile`, body);
};

// export
const api = { updateProfile, getProfile, create, existsByEmail, existsByUsername, resendEmailToActiveAccount, requestResetPassword, resendEmailToResetpassword, resetPassword }
export default api;