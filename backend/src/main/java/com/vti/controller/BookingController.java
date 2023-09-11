package com.vti.controller;

import com.vti.dto.*;
import com.vti.entity.Booking;
import com.vti.entity.BookingStatus;
import com.vti.entity.Tour;
import com.vti.entity.User;
import com.vti.repository.BookingRepository;
import com.vti.repository.TourRepository;
import com.vti.repository.UserRepository;
import com.vti.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Transactional
@CrossOrigin(value = "*")
@RequestMapping(value = "/api/v1/bookings")

public class BookingController {

    @Autowired
    private IBookingService service ;

    @Autowired
    private BookingRepository bookingRepo ;

    @Autowired
    private TourRepository tourRepo ;

    @Autowired
    private UserRepository userRepo ;

    // GET ALL
    @GetMapping()
    public ResponseEntity<?> getAll(Pageable pageable) {
        Page<Booking> pageBookings = bookingRepo.findAll(pageable) ;

        List<Booking> bookings = pageBookings.stream().collect(Collectors.toList());

        List<BookingDTO> bookingDTOS = new ArrayList<>() ;

        int idCounter = 1;
        for (int i = 0; i < bookings.size(); i++) {
            BookingDTO bookingDTO = new BookingDTO() ;

            bookingDTO.setId(idCounter++);
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
//            bookingDTO.setTongGia(bookings.get(i).getSoChoEmBe());
            if (bookings.get(i).getStatus() == BookingStatus.BOOKING_DRAFT) {
                bookingDTO.setStatus("Booking chưa được duyệt") ;
            }
            if (bookings.get(i).getStatus() == BookingStatus.BOOKING_DONE) {
                bookingDTO.setStatus("Booking đã được duyệt") ;
            }
            if (bookings.get(i).getStatus() == BookingStatus.BOOKING_CANCEL) {
                bookingDTO.setStatus("Booking bị từ chối duyệt") ;
            }
            if (bookings.get(i).getStatus() == BookingStatus.BOOKING_DELETE) {
                bookingDTO.setStatus("Booking đã bị hủy") ;
            }

            Tour tour = bookings.get(i).getTour();
            if (tour != null) {
                String a =  bookings.get(i).getTour().getMaTour();
                bookingDTO.setTourId(a);
            }
            bookingDTOS.add(bookingDTO);
        }

        // Sắp xếp danh sách bookingDTOS
        List<BookingDTO> sortedBookings = new ArrayList<>();
        List<BookingDTO> deletedBookings = new ArrayList<>();
        List<BookingDTO> canceledBookings = new ArrayList<>();
        List<BookingDTO> draftBookings = new ArrayList<>();

        for (BookingDTO bookingDTO : bookingDTOS) {
            if (bookingDTO.getStatus().equals("Booking đã bị hủy")) {
                deletedBookings.add(bookingDTO);
            } else if (bookingDTO.getStatus().equals("Booking bị từ chối duyệt")) {
                canceledBookings.add(bookingDTO);
            } else if (bookingDTO.getStatus().equals("Booking chưa được duyệt")) {
                draftBookings.add(bookingDTO);
            }else {
                sortedBookings.add(bookingDTO);
            }
        }
        sortedBookings.addAll(draftBookings);
        sortedBookings.addAll(canceledBookings);
        sortedBookings.addAll(deletedBookings);
        return new ResponseEntity<>(sortedBookings, HttpStatus.OK) ;
    }

    // CREAT NEW BOOKING
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
        booking.setTongGia(creatBookingDTO.getTongGia());
        booking.setSoNguoiThamGia();

        // check nếu khác null sẽ đẩy dữ liệu lên db luôn còn ko sẽ đẩy thẳng DL lên DB
        if (creatBookingDTO.getTourId() != null) {
            Tour tour = tourRepo.findByMaTour(creatBookingDTO.getTourId());
            booking.setTour(tour);
        }
        if (creatBookingDTO.getUserId() > 0 ) {
            User user = userRepo.findById(creatBookingDTO.getUserId());
            booking.setUser(user);
        }
        bookingRepo.save(booking);
        return new ResponseEntity<>(booking.getMaBooking(), HttpStatus.OK) ;
    }

    // GET BY ID
    @GetMapping("/{maBooking}")
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
        if (booking.get().getStatus() == BookingStatus.BOOKING_DRAFT) {
            bookingDTO.setStatus("Booking chưa được duyệt") ;
        }
        if (booking.get().getStatus() == BookingStatus.BOOKING_DONE) {
            bookingDTO.setStatus("Booking đã được duyệt") ;
        }
        if (booking.get().getStatus() == BookingStatus.BOOKING_CANCEL) {
            bookingDTO.setStatus("Booking bị từ chối duyệt") ;
        }

        Tour tour = booking.get().getTour();
        if (tour != null) {
            String b =  booking.get().getTour().getMaTour();
            bookingDTO.setTourId(b);
        }

        return new ResponseEntity<>(bookingDTO, HttpStatus.OK) ;
    }

    // GET BY NAMEKH
    @GetMapping("/name/{nameKH}")
    public ResponseEntity<?> getBookingByNameKH ( @PathVariable String nameKH) {
        List<BookingDTO> bookingDTOS = service.getBookingByNameKH(nameKH);
        return new ResponseEntity<>(bookingDTOS , HttpStatus.OK);
    }

    // DELETE BY ID
    @DeleteMapping("/{maBooking}")
    public ResponseEntity<?> delete (@PathVariable int maBooking) {
        bookingRepo.deleteById(maBooking);
        return new ResponseEntity<>("delete thành công", HttpStatus.OK) ;
    }

    // UPDATE BY ID
    @PutMapping("/{maBooking}")
    public ResponseEntity<?> updateById (@PathVariable int maBooking , @RequestBody BookingUpdateDTO bookingUpdateDTO) {
        service.updateBookingById(maBooking, bookingUpdateDTO);
        return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
    }

    // GET TOUR BOOKING
    @GetMapping("/booking-tour/{maBooking}")
    public ResponseEntity<?> getTourBooking (@PathVariable int maBooking){
        BookingTourDTO bookingTourDTO = service.getTourBooking(maBooking);
        return new ResponseEntity<>(bookingTourDTO , HttpStatus.OK);
    }

    // UPDATE STATUS
    @PutMapping("/booking-status")
    public ResponseEntity<?> updateStatusBooking (@RequestParam int maBooking, @RequestParam int status ) {

        if (status == BookingStatus.BOOKING_CANCEL) {
            service.cancelBooking(maBooking);
        }else if (status == BookingStatus.BOOKING_DONE) {
            service.approveBooking(maBooking);
        }else if (status == BookingStatus.BOOKING_DRAFT) {
            service.draftBooking(maBooking);
        }else if (status == BookingStatus.BOOKING_DELETE) {
            service.deleteBooking(maBooking);
            }
        return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
    }

    // GET SỐ LƯỢNG BOOKING TRONG THANG
    @GetMapping("/so-luong-booking-trong-thang")
    public ResponseEntity<?> thongKeSLBookingTheoThang() {
        List<ThongKeBookingDTO> bookingThongKe = service.thongKeLuongBookingTrongThang();
        return new ResponseEntity<>(bookingThongKe, HttpStatus.OK);
    }

    // GET SỐ LƯỢNG BOOKING TRONG TUẦN
    @GetMapping("/so-luong-booking-trong-tuan")
    public ResponseEntity<?> thongKeSLBookingTrongTuan() {
        List<ThongKeBookingDTO> bookingThongKe = service.thongKeLuongBookingTrongTuan();
        return new ResponseEntity<>(bookingThongKe, HttpStatus.OK);
    }

    // GET % SỐ CHỖ CÁC ĐỘ TUỔI
    @GetMapping("/ty-le-phan-tram")
    public ResponseEntity<?> ThongKeSoCho() {
        List<PieChartDTO>  soChoCacDoTuoi = service.tinhPhanTramCacDoTuoi();
        return new ResponseEntity<>(soChoCacDoTuoi, HttpStatus.OK);
    }

    // GET SỐ TIỀN KIẾM ĐC TRONG THÁNG
    @GetMapping("/thong-ke-doanh-thu-trong-thang")
    public ResponseEntity<?> ThongKeSoTienTrongThang() {
        List<ThongKeDoanhThuBookingDTO>  bookingThongKe = service.thongkeSoTienTrongThang();
        return new ResponseEntity<>(bookingThongKe, HttpStatus.OK);
    }

    // GET BOOKING BY USER ID
    @GetMapping("/userId/{userId}")
    public ResponseEntity<?> getBookingByUserId ( @PathVariable int userId) {
        List<BookingUserDTO> bookingDTOS = service.getListBookingByUserId(userId);
        return new ResponseEntity<>(bookingDTOS , HttpStatus.OK);
    }
}
