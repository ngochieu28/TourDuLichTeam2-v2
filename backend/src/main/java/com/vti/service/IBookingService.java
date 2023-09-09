package com.vti.service;
import com.vti.dto.*;
import com.vti.entity.Booking;

import java.util.List;

public interface IBookingService  {

    void createBooking(Booking booking);

    Booking getBookingByMaBooking(int maBooking);

    void updateBookingById(int maBooking , BookingUpdateDTO bookingUpdateDTO);

    BookingTourDTO getTourBooking(int maBooking);

    List<BookingDTO> getBookingByNameKH(String nameKH);

    void approveBooking(int maBooking);

    void cancelBooking(int maBooking);

    List<ThongKeBookingDTO>  thongKeLuongBookingTrongThang();

    List<PieChartDTO> tinhPhanTramCacDoTuoi();

    List<BookingTourDTO> getListBookingByUserId(int userId);

}
