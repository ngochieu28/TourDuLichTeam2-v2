package com.vti.controller;

import com.vti.dto.BookingDTO;
import com.vti.dto.CreatBookingDTO;
import com.vti.entity.Booking;
import com.vti.entity.Tour;
import com.vti.repository.BookingRepository;
import com.vti.repository.TourRepository;
import com.vti.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/v1/bookings")

public class BookingController {

    @Autowired
    private BookingRepository bookingRepo ;

    @Autowired
    private TourRepository tourRepo ;

    // get All
    @GetMapping()
    public ResponseEntity<?> getAll(Pageable pageable) {
        Page<Booking> pageBookings = bookingRepo.findAll(pageable) ;

        List<Booking> bookings = pageBookings.stream().collect(Collectors.toList());

        List<BookingDTO> bookingDTOS = new ArrayList<>() ;

        for (int i = 0; i < bookings.size(); i++) {
            BookingDTO bookingDTO = new BookingDTO() ;

            bookingDTO.setMaBooking(bookings.get(i).getMaBooking());
            bookingDTO.setNameKH(bookings.get(i).getNameKH());
            bookingDTO.setEmailKH(bookings.get(i).getEmailKH());
            bookingDTO.setPhoneNumber(bookings.get(i).getPhoneNumber());
            bookingDTO.setDiaChi(bookings.get(i).getDiaChi());
            bookingDTO.setSoChoNL(bookings.get(i).getSoChoNL());
//            bookingDTO.setSoChoNguoiLon(bookings.get(i).getSoChoNguoiLon());
            bookingDTO.setSoChoTreEm(bookings.get(i).getSoChoTreEm());
            bookingDTO.setSoChoTreNho(bookings.get(i).getSoChoTreNho());
            bookingDTO.setSoChoEmBe(bookings.get(i).getSoChoEmBe());


            Tour tour = bookings.get(i).getTour();
            if (tour != null) {
                String a =  bookings.get(i).getTour().getMaTour();
                bookingDTO.setTourId(a);
            }
            bookingDTOS.add(bookingDTO);

        }
        return new ResponseEntity<>(bookingDTOS, HttpStatus.OK) ;
    }

    // create new booking
    @PostMapping()
    public ResponseEntity<?> creat(@RequestBody CreatBookingDTO creatBookingDTO) {

        Booking booking = new Booking();

        booking.setMaBooking(creatBookingDTO.getMaBooking());
        booking.setNameKH(creatBookingDTO.getNameKH());
        booking.setEmailKH(creatBookingDTO.getEmailKH());
        booking.setPhoneNumber(creatBookingDTO.getPhoneNumber());
        booking.setDiaChi(creatBookingDTO.getDiaChi());
        booking.setSoChoNL(creatBookingDTO.getSoChoNL());
        booking.setSoChoNguoiLon(creatBookingDTO.getSoChoNguoiLon());
        booking.setSoChoTreEm(creatBookingDTO.getSoChoTreEm());
        booking.setSoChoTreNho(creatBookingDTO.getSoChoTreNho());
        booking.setSoChoEmBe(creatBookingDTO.getSoChoEmBe());


        // check nếu khác null sẽ đẩy dữ liệu lên db luôn còn ko sẽ đẩy thẳng DL lên DB
        if (creatBookingDTO.getTourId() != null) {
            Tour tour = tourRepo.findByMaTour(creatBookingDTO.getTourId());
            booking.setTour(tour);
        }
        bookingRepo.save(booking);
        return new ResponseEntity<>(booking.getMaBooking(), HttpStatus.OK) ;
    }

    // get by id
    @GetMapping("{maBooking}")
    public ResponseEntity<?> getBookingById (@PathVariable int maBooking) {
        Optional<Booking> booking = Optional.ofNullable(bookingRepo.findByMaBooking(maBooking));

        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setMaBooking(booking.get().getMaBooking());
        bookingDTO.setNameKH(booking.get().getNameKH());
        bookingDTO.setEmailKH(booking.get().getEmailKH());
        bookingDTO.setPhoneNumber(booking.get().getPhoneNumber());
        bookingDTO.setDiaChi(booking.get().getDiaChi());
        bookingDTO.setSoChoNL(booking.get().getSoChoNL());
//        bookingDTO.setSoChoNguoiLon(booking.get().getSoChoNguoiLon());
        bookingDTO.setSoChoTreEm(booking.get().getSoChoTreEm());
        bookingDTO.setSoChoTreNho(booking.get().getSoChoTreNho());
        bookingDTO.setSoChoEmBe(booking.get().getSoChoEmBe());

        Tour tour = booking.get().getTour();
        if (tour != null) {
            String b =  booking.get().getTour().getMaTour();
            bookingDTO.setTourId(b);
        }

        return new ResponseEntity<>(bookingDTO, HttpStatus.OK) ;
    }



}
