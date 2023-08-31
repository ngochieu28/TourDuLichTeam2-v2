package com.vti.service;

import com.vti.dto.BookingDTO;
import com.vti.dto.BookingTourDTO;
import com.vti.entity.Booking;
import com.vti.entity.Tour;
import com.vti.repository.BookingRepository;
import com.vti.repository.TourRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;

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
    public void updateBookingById(int maBooking, BookingDTO bookingDTO) {
        Booking booking = bookingRepo.findByMaBooking(maBooking);
        if (booking == null) {
            // Nếu không tìm thấy booking, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            try {
                throw new NotFoundException("Booking not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        if (bookingDTO.getNameKH() != null) {
            booking.setNameKH(bookingDTO.getNameKH());
        }
        if (bookingDTO.getEmailKH() != null) {
            booking.setEmailKH(bookingDTO.getEmailKH());
        }
        if (bookingDTO.getDiaChi() != null) {
            booking.setDiaChi(bookingDTO.getDiaChi());
        }
        if (bookingDTO.getPhoneNumber() != null) {
            booking.setPhoneNumber(bookingDTO.getPhoneNumber());
        }
        if (bookingDTO.getSoChoNL() != null) {
            booking.setSoChoNL(bookingDTO.getSoChoNL());
        }
        if (bookingDTO.getSoChoNguoiLon() != null) {
            booking.setSoChoNguoiLon(bookingDTO.getSoChoNguoiLon());
        }
        if (bookingDTO.getSoChoTreEm() != null) {
            booking.setSoChoTreEm(bookingDTO.getSoChoTreEm());
        }
        if (bookingDTO.getSoChoTreNho() != null) {
            booking.setSoChoTreNho(bookingDTO.getSoChoTreNho());
        }
        if (bookingDTO.getSoChoEmBe() != null) {
            booking.setSoChoEmBe(bookingDTO.getSoChoEmBe());
        }

        if (bookingDTO.getTourId() != null) {
            Tour tour = TourRepo.findByMaTour(bookingDTO.getTourId());
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
                String soChoNL = resultSet.getString("soChoNL");
                String soChoTreEm = resultSet.getString("soChoTreEm");
                String soChoTreNho = resultSet.getString("soChoTreNho");
                String soChoEmBe = resultSet.getString("soChoEmBe");
                String image = resultSet.getString("image");
                String noiKhoiHanh = resultSet.getString("noiKhoiHanh");
                String ngayKhoiHanh = resultSet.getString("ngayKhoiHanh");
                String thoiGian = resultSet.getString("thoiGian");

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


}
