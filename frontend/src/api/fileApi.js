import axiosClient from "./axiosClient";

const fileApi = {
    getImage(img) {
        const url = `files/image/${img}`
        return axiosClient.get(url)
    }
}

export default fileApi