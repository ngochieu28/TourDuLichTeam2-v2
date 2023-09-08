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
    thongKeSoTourTheoThang() {
        const url = `/tours/thong-ke-so-tour-theo-thang`
        return axiosClient.get(url)
    },
    thongKeTourVoiNoiKhoiHanh() {
        const url = `/tours/thong-ke-tour-voi-noi-khoi-hanh`
        return axiosClient.get(url)
    },
    thongKeSoCho() {
        const url = `/tours/thong-ke-so-cho`
        return axiosClient.get(url)
    },
    addTour(tourDTO) {
        const url = `/tours`
        return axiosClient.post(url, tourDTO)
    },
    updateSoChoTour(maTour, soChoDaDat) {
        const url = `/tours/updateSoCho/${maTour}`
        return axiosClient.put(url, soChoDaDat)
    },
    updateTour(maTour, tourDTO) {
        const url = `/tours/${maTour}`
        return axiosClient.put(url, tourDTO)
    },
    updateimg(maTour, infoImg) {
        const url = `/tours/updateimage/${maTour}`
        return axiosClient.put(url, infoImg)
    },
    deleteByMaTour(maTour) {
        const url = `/tours/${maTour}`
        return axiosClient.delete(url);
    }
}

export default tourApi