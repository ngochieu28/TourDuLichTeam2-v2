package com.vti.service;

import com.vti.dto.filter.GroupFilter;
import com.vti.entity.Booking;
import com.vti.entity.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IBookingService extends UserDetailsService {

//    Page<Booking> getAllBooking(Pageable pageable, GroupFilter filter, String search);

    void createBooking(Booking booking);

    Booking getBookingByMaBooking(String maBooking);
}
