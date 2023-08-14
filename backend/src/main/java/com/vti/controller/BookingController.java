package com.vti.controller;

import com.vti.dto.BookingDTO;
import com.vti.entity.Booking;
import com.vti.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/v1/bookings")

public class BookingController {

    @Autowired
    private BookingRepository bookingRepo ;

    // get All
    @GetMapping()
    public ResponseEntity<?> getAll() {
        List<Booking> bookings = bookingRepo.findAll() ;

        List<BookingDTO> bookingDTOS = new ArrayList<>() ;

        for (int i = 0; i < bookings.size(); i++) {
            BookingDTO bookingDTO = new BookingDTO() ;

            bookingDTO.setMaBooking(bookings.get(i).getMaBooking());
            bookingDTO.setNameKH(bookings.get(i).getNameKH());
            bookingDTO.setEmailKH(bookings.get(i).getEmailKH());
            bookingDTO.setPhoneNumber(bookings.get(i).getPhoneNumber());
            bookingDTO.setDiaChi(bookings.get(i).getDiaChi());
            bookingDTO.setDateOfBirth(bookings.get(i).getDateOfBirth());
            bookingDTO.setAge(bookings.get(i).getAge());

            bookingDTOS.add(bookingDTO);

        }
        return new ResponseEntity<>(bookingDTOS, HttpStatus.OK) ;
    }

    // create new booking
    @PostMapping()
    public ResponseEntity<?> creat(@RequestBody Booking booking) {
        System.out.println(booking);

        bookingRepo.save(booking);
        return new ResponseEntity<>("Create thành công", HttpStatus.OK) ;
    }

    // get by id
    @GetMapping("{maBooking}")
    public ResponseEntity<?> getBookingByNameKH (@PathVariable String maBooking) {
        Optional<Booking> booking = Optional.ofNullable(bookingRepo.findByMaBooking(maBooking));

        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setMaBooking(booking.get().getMaBooking());
        bookingDTO.setNameKH(booking.get().getNameKH());
        bookingDTO.setEmailKH(booking.get().getEmailKH());
        bookingDTO.setPhoneNumber(booking.get().getPhoneNumber());
        bookingDTO.setDiaChi(booking.get().getDiaChi());
        bookingDTO.setDateOfBirth(booking.get().getDateOfBirth());
        bookingDTO.setAge(booking.get().getAge());

        return new ResponseEntity<>(bookingDTO, HttpStatus.OK) ;
    }




}
