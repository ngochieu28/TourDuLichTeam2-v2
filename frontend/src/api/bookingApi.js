import axiosClient from "./axiosClient";

const bookingApi = {

    //get all
    getAll() {
        const url = `/booking`
        return axiosClient.get(url)
    },

    //get by maBooking
    getBookingById(id) {
        const url = `/booking/${id}`
        return axiosClient.get(url)
    },

    // tạo mới 
    creatBooking(data) {
        const url = '/booking'
        return axiosClient.post(url, data)
    },
}
export default bookingApi;
