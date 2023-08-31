import axiosClient from "./axiosClient";

const bookingApi = {

    //get all
    getAll() {
        const url = `/bookings`
        return axiosClient.get(url)
    },

    //get by maBooking
    getBookingById(maBooking) {
        const url = `/bookings/${maBooking}`
        return axiosClient.get(url)
    },

    // tạo mới 
    creatBooking(data) {
        const url = `/bookings`
        return axiosClient.post(url, data)
    },

    // delete
    deleteBookingById(maBooking) {
        const url = `/bookings/${maBooking}`
        return axiosClient.delete(url)
    },

    // get TourBooking 
    getTourBooking(maBooking) {
        const url = `/bookings/booking-tour/${maBooking}`
        return axiosClient.get(url)
    },

    // update
    updateBooking(maBooking) {
        const url = `/bookings/${maBooking}`
        return axiosClient.put(url)
    },

}
export default bookingApi;
