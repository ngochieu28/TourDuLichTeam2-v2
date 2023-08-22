package com.vti.service;

import com.vti.entity.Booking;
import com.vti.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Override
    public void createBooking(Booking booking) {
    }

    @Override
    public Booking getBookingByMaBooking(int maBooking) {
        return bookingRepo.findByMaBooking(maBooking);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return null;
    }
}
