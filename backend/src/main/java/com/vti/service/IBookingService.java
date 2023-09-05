package com.vti.service;
import com.vti.dto.BookingDTO;
import com.vti.dto.BookingTourDTO;
import com.vti.dto.BookingUpdateDTO;
import com.vti.entity.Booking;

public interface IBookingService  {

//    Page<Booking> getAllBooking(Pageable pageable, GroupFilter filter, String search);

    void createBooking(Booking booking);

    Booking getBookingByMaBooking(int maBooking);

    void updateBookingById(int maBooking , BookingUpdateDTO bookingUpdateDTO);

    BookingTourDTO getTourBooking(int maBooking);

    void approveBooking(int maBooking);

    void cancelBooking(int maBooking);
}
