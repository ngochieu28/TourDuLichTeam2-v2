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

    //get by nameKH
    getBookingByNameKH(nameKH) {
        const url = `/bookings/name/${nameKH}`
        return axiosClient.get(url)
    },

    // get by userID
    getBookingByUserId(userid) {
        const url = `/bookings/userId/${userid}`
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
    updateBooking(maBooking, data) {
        const url = `/bookings/${maBooking}`
        return axiosClient.put(url, data)
    },

    // update status
    updateStatusBooking(maBooking, status) {
        const url = `/bookings/booking-status?maBooking=${maBooking}&status=${status}`
        return axiosClient.put(url)
    },

    // get sl booking trong tháng
    getBookingTrongThang() {
        const url = `/bookings/so-luong-booking-trong-thang`
        return axiosClient.get(url)
    },

    // tính % số lượng các độ tuổi
    getPhanTramBooking() {
        const url = `/bookings/ty-le-phan-tram`
        return axiosClient.get(url)
    },

    // thống kê doanh thu trong tháng 
    getDoanhThuBooking() {
        const url = `/bookings/thong-ke-doanh-thu-trong-thang`
        return axiosClient.get(url)
    },

}
export default bookingApi;
