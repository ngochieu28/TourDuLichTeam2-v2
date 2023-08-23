import axiosClient from "./axiosClient";


const tourApi = {
    getTourHot() {
        const url = `tours?page=1&size=6&sort=luotQuanTam,desc`
        return axiosClient.get(url)
    },
    getAllTour(page = 1, size = 9, sortField = 'ngayKhoiHanh', sortType = 'desc', searchNoiKhoiHanh = '', searchDiemDen = '', searchThoiGian = '') {
        const url = "/tours";
        const parameters = {
            page,
            size,
            sort: `${sortField},${sortType}`
        }

        // searchNoiKhoiHanh
        if (searchNoiKhoiHanh) {
            parameters.searchNoiKhoiHanh = searchNoiKhoiHanh;
        }
        // searchDiemDen
        if (searchDiemDen) {
            parameters.searchDiemDen = searchDiemDen;
        }
        // searchThoiGian
        if (searchThoiGian) {
            parameters.searchThoiGian = searchThoiGian;
        }

        return axiosClient.get(`${url}`, { params: parameters });
    },
    getTourByMaTour(maTour) {
        const url = `/tours/${maTour}`
        return axiosClient.get(url)
    },
    getTourDetailByMaTour(maTour) {
        const url = `/tours/detail/${maTour}`
        return axiosClient.get(url)
    },
    updateSoChoTour(maTour, soChoDaDat) {
        const url = `/tours/${maTour}`
        return axiosClient.put(url, soChoDaDat)
    },
    deleteByMaTour(maTour) {
        const url = `/tours/${maTour}`
        return axiosClient.delete(url);
    }
}

export default tourApi