import axiosClient from "./axiosClient";

const tourApi = {
    getTourHot() {
        const url = `tours?page=1&size=6&sort=luotQuanTam,desc`
        return axiosClient.get(url)
    },
    getAllTour(page) {
        const url = `/tours?page=${page}&size=9&sort=ngayKhoiHanh,desc`
        return axiosClient.get(url)
    },
    getTourByMaTour(maTour) {
        const url = `/tours/${maTour}`
        return axiosClient.get(url)
    },
}

export default tourApi