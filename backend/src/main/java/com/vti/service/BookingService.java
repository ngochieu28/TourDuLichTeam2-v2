package com.vti.service;

import com.vti.dto.BookingDTO;
import com.vti.dto.BookingTourDTO;
import com.vti.dto.BookingUpdateDTO;
import com.vti.entity.Booking;
import com.vti.entity.BookingStatus;
import com.vti.entity.Tour;
import com.vti.repository.BookingRepository;
import com.vti.repository.TourRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.Optional;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private TourRepository TourRepo;

    @Override
    public void createBooking(Booking booking) {
    }

    @Override
    public Booking getBookingByMaBooking(int maBooking) {
        return bookingRepo.findByMaBooking(maBooking);
    }

    @Override
    public void updateBookingById(int maBooking, BookingUpdateDTO bookingUpdateDTO) {
        Booking booking = bookingRepo.findByMaBooking(maBooking);
        if (booking == null) {
            // Nếu không tìm thấy booking, bạn có thể xử lý theo ý muốn
            try {
                throw new NotFoundException("Booking not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        if (bookingUpdateDTO.getNameKH() != null) {
            booking.setNameKH(bookingUpdateDTO.getNameKH());
        }
        if (bookingUpdateDTO.getEmailKH() != null) {
            booking.setEmailKH(bookingUpdateDTO.getEmailKH());
        }
        if (bookingUpdateDTO.getDiaChi() != null) {
            booking.setDiaChi(bookingUpdateDTO.getDiaChi());
        }
        if (bookingUpdateDTO.getPhoneNumber() != null) {
            booking.setPhoneNumber(bookingUpdateDTO.getPhoneNumber());
        }
        if (bookingUpdateDTO.getSoChoNL() != null) {
            booking.setSoChoNL(bookingUpdateDTO.getSoChoNL());
        }
        if (bookingUpdateDTO.getSoChoNguoiLon() != null) {
            booking.setSoChoNguoiLon(bookingUpdateDTO.getSoChoNguoiLon());
        }
        if (bookingUpdateDTO.getSoChoTreEm() != null) {
            booking.setSoChoTreEm(bookingUpdateDTO.getSoChoTreEm());
        }
        if (bookingUpdateDTO.getSoChoTreNho() != null) {
            booking.setSoChoTreNho(bookingUpdateDTO.getSoChoTreNho());
        }
        if (bookingUpdateDTO.getSoChoEmBe() != null) {
            booking.setSoChoEmBe(bookingUpdateDTO.getSoChoEmBe());
        }
        if (bookingUpdateDTO.getTongGia() != null ){
            booking.setTongGia(bookingUpdateDTO.getTongGia());
        }
            booking.setStatus(bookingUpdateDTO.getStatus());


        if (bookingUpdateDTO.getTourId() != null) {
            Tour tour = TourRepo.findByMaTour(bookingUpdateDTO.getTourId());
            booking.setTour(tour);
        }
        bookingRepo.save(booking);
    }

    @Override
    public BookingTourDTO getTourBooking(int maBooking1 ) {
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        BookingTourDTO bookingTourDTO = new BookingTourDTO();

        try {
            // Kết nối tới cơ sở dữ liệu
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/TourDuLich", "root" , "root");

            // Tạo câu truy vấn JOIN
            String query = "SELECT * FROM tour AS t \n" +
                    "JOIN booking AS b ON t.maTour = b.tour_id\n" +
                    "WHERE maBooking =  " + maBooking1;

            // Tạo đối tượng Statement
            statement = connection.createStatement();

            // Thực thi câu truy vấn
            resultSet = statement.executeQuery(query);

            // Xử lý kết quả
            while (resultSet.next()) {
                String maTour = resultSet.getString("maTour");
                String tourName = resultSet.getString("tenTour");
                String nameKH = resultSet.getString("nameKH");
                String emailKH = resultSet.getString("emailKH");
                String phoneNumber = resultSet.getString("phoneNumber");
                String diaChi = resultSet.getString("diaChi");
                Integer soChoNL = resultSet.getInt("soChoNL");
                Integer soChoTreEm = resultSet.getInt("soChoTreEm");
                Integer soChoTreNho = resultSet.getInt("soChoTreNho");
                Integer soChoEmBe = resultSet.getInt("soChoEmBe");
                String image = resultSet.getString("image");
                String noiKhoiHanh = resultSet.getString("noiKhoiHanh");
                String ngayKhoiHanh = resultSet.getString("ngayKhoiHanh");
                String thoiGian = resultSet.getString("thoiGian");
                Integer soCho = resultSet.getInt("soCho");
                Integer tongGia = resultSet.getInt("tongGia");
                Integer giaTour = resultSet.getInt("giaTour");


                // Xử lý dữ liệu
                bookingTourDTO.setMaTour(maTour);
                bookingTourDTO.setTenTour(tourName);
                bookingTourDTO.setNameKH(nameKH);
                bookingTourDTO.setEmailKH(emailKH);
                bookingTourDTO.setPhoneNumber(phoneNumber);
                bookingTourDTO.setDiaChi(diaChi);
                bookingTourDTO.setSoChoNL(soChoNL);
                bookingTourDTO.setSoChoTreEm(soChoTreEm);
                bookingTourDTO.setSoChoTreNho(soChoTreNho);
                bookingTourDTO.setSoChoEmBe(soChoEmBe);
                bookingTourDTO.setImage(image);
                bookingTourDTO.setNoiKhoiHanh(noiKhoiHanh);
                bookingTourDTO.setNgayKhoiHanh(ngayKhoiHanh);
                bookingTourDTO.setThoiGian(thoiGian);
                bookingTourDTO.setSoCho(soCho);
                bookingTourDTO.setTongGia(tongGia);
                bookingTourDTO.setGiaTour(giaTour);
                bookingTourDTO.setGiaTreEm(bookingTourDTO.getGiaTreEm());
                bookingTourDTO.setGiaTreNho(bookingTourDTO.getGiaTreNho());
                bookingTourDTO.setGiaEmBe(bookingTourDTO.getGiaEmBe());

            }
        } catch (SQLException e) {
            e.printStackTrace();
            }  finally {
            // Đóng kết nối và giải phóng tài nguyên
                try {
                    if (resultSet != null) {
                    resultSet.close();
                    }
                    if (statement != null) {
                    statement.close();
                    }
                    if (connection != null) {
                    connection.close();
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            return bookingTourDTO;
        }

    @Override
    public void approveBooking(int maBooking) {
        Booking booking = bookingRepo.findByMaBooking(maBooking);
        if (booking == null) {
            // Nếu không tìm thấy booking, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            try {
                throw new NotFoundException("Booking not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        booking.setStatus(BookingStatus.BOOKING_DONE);
        bookingRepo.save(booking);
    }

    @Override
    public void cancelBooking(int maBooking) {
        Booking booking = bookingRepo.findByMaBooking(maBooking);
        if (booking == null) {
            // Nếu không tìm thấy booking, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            try {
                throw new NotFoundException("Booking not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        booking.setStatus(BookingStatus.BOOKING_CANCEL);
        bookingRepo.save(booking);
    }


}
