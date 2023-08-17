import axiosClient from "./axiosClient";

const bookingApi = {

    //get all
    getAll() {
        const url = `/bookings`
        return axiosClient.get(url)
    },

    //get by maBooking
    getBookingById(id) {
        const url = `/bookings/${id}`
        return axiosClient.get(url)
    },

    // tạo mới 
    creatBooking(data) {
        const url = `/bookings`
        return axiosClient.post(url, data)
    },
}
export default bookingApi;
