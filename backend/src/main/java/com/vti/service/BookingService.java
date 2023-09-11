package com.vti.service;

import com.vti.dto.*;
import com.vti.entity.Booking;
import com.vti.entity.BookingStatus;
import com.vti.entity.Tour;
import com.vti.repository.BookingRepository;
import com.vti.repository.TourRepository;
import javassist.NotFoundException;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.sql.*;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
public class BookingService implements IBookingService {

    @PersistenceContext
    private EntityManager entityManager;

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
    public List<BookingDTO> getBookingByNameKH(String nameKH) {
        List<Booking> booking = bookingRepo.findByNameKH(nameKH);
        List<BookingDTO> bookingDTOS = new ArrayList<>();

        for (Booking bookings : booking) {
            BookingDTO bookingDTO = new BookingDTO();

            bookingDTO.setMaBooking(bookings.getMaBooking());
            bookingDTO.setNameKH(bookings.getNameKH());
            bookingDTO.setEmailKH(bookings.getEmailKH());
            bookingDTO.setPhoneNumber(bookings.getPhoneNumber());
            bookingDTO.setDiaChi(bookings.getDiaChi());
            bookingDTO.setSoChoNL(bookings.getSoChoNL());
            bookingDTO.setSoChoTreEm(bookings.getSoChoTreEm());
            bookingDTO.setSoChoTreNho(bookings.getSoChoTreNho());
            bookingDTO.setSoChoEmBe(bookings.getSoChoEmBe());

            if (bookings.getStatus() == BookingStatus.BOOKING_DRAFT) {
                bookingDTO.setStatus("Booking chưa được duyệt");
            } else if (bookings.getStatus() == BookingStatus.BOOKING_DONE) {
                bookingDTO.setStatus("Booking đã được duyệt");
            } else if (bookings.getStatus() == BookingStatus.BOOKING_CANCEL) {
                bookingDTO.setStatus("Booking bị từ chối duyệt");
            }
            Tour tour = bookings.getTour();
            if (tour != null) {
                bookingDTO.setTourId(tour.getMaTour());
            }
            bookingDTOS.add(bookingDTO);
        }
        return bookingDTOS;
    }

    @Override
    public void draftBooking(int maBooking) {
        Booking booking = bookingRepo.findByMaBooking(maBooking);
        if (booking == null) {
            // Nếu không tìm thấy booking, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            try {
                throw new NotFoundException("Booking not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        booking.setStatus(BookingStatus.BOOKING_DRAFT);
        bookingRepo.save(booking);
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

    @Override
    public void deleteBooking(int maBooking) {
        Booking booking = bookingRepo.findByMaBooking(maBooking);
        if (booking == null) {
            // Nếu không tìm thấy booking, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            try {
                throw new NotFoundException("Booking not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        booking.setStatus(BookingStatus.BOOKING_DELETE);
        bookingRepo.save(booking);
    }

    @Override
    public List<ThongKeBookingDTO> thongKeLuongBookingTrongThang() {
        String query = "SELECT FUNCTION('MONTH' , b.thoiGianDat) AS thang, COUNT(b.thoiGianDat) AS so_luong_theo_thang\n" +
                "FROM Booking b " +
                "GROUP BY FUNCTION('MONTH' , b.thoiGianDat)" +
                "ORDER BY FUNCTION('MONTH', b.thoiGianDat) ASC";
        TypedQuery<Object[]> typedQuery = entityManager.createQuery(query, Object[].class);
        List<Object[]> results = typedQuery.getResultList();

        List<ThongKeBookingDTO> thongKeBookingDTOList = new ArrayList<>();
        for (Object[] result : results) {
            Integer thoiGianDat = (Integer) result[0];
            Long soLuongTheoThang = (Long) result[1];

            ThongKeBookingDTO bookingDTO = new ThongKeBookingDTO();
            bookingDTO.setThoiGianDat("tháng " + thoiGianDat);
            bookingDTO.setSoLuongTheoThang(soLuongTheoThang.intValue());

            thongKeBookingDTOList.add(bookingDTO);
        }
        return thongKeBookingDTOList;
    }

    @Override
    public List<ThongKeBookingDTO> thongKeLuongBookingTrongTuan() {
        String query = "SELECT DATE(b.thoiGianDat) AS ngay, COUNT(DATE(b.thoiGianDat)) AS so_luong_theo_ngay " +
                "FROM Booking AS b " +
                "WHERE DATE(b.thoiGianDat) >= CURDATE() - INTERVAL 7 DAY " +
                "  AND DATE(b.thoiGianDat) <= CURDATE() " +
                "GROUP BY DATE(b.thoiGianDat)";

        TypedQuery<Object[]> typedQuery = entityManager.createQuery(query, Object[].class);
        List<Object[]> results = typedQuery.getResultList();

        List<ThongKeBookingDTO> thongKeBookingDTOList = new ArrayList<>();
        for (Object[] result : results) {
            Date ngay = (Date) result[0];
            Long soLuongTheoNgay = (Long) result[1];

            ThongKeBookingDTO bookingDTO = new ThongKeBookingDTO();
            bookingDTO.setNgayDat(ngay);
            bookingDTO.setSoLuongTheoTuan(soLuongTheoNgay.intValue());

            thongKeBookingDTOList.add(bookingDTO);
        }

        return thongKeBookingDTOList;
    }

    @Override
    public List<PieChartDTO> tinhPhanTramCacDoTuoi() {
        String queryString = "SELECT " +
                "SUM(b.soNguoiThamGia) AS tong_so_nguoi, " +
                "SUM(b.soChoNL) AS tong_so_cho_nl, " +
                "SUM(b.soChoTreEm) AS tong_so_cho_tre_em, " +
                "SUM(b.soChoTreNho) AS tong_so_cho_tre_nho, " +
                "SUM(b.soChoEmBe) AS tong_so_cho_em_be " +
                "FROM Booking b";

        TypedQuery<Object[]> typedQuery = entityManager.createQuery(queryString, Object[].class);
        Object[] result = typedQuery.getSingleResult();

        List<PieChartDTO> thongKeSoCho = new ArrayList<>();

        PieChartDTO soChoNLDaDatDTO = new PieChartDTO();
        soChoNLDaDatDTO.setName("Số chỗ người lớn đã đặt: ");
        soChoNLDaDatDTO.setValue(((Long) result[1]).intValue());
        thongKeSoCho.add(soChoNLDaDatDTO);

        PieChartDTO soChoTreEmDaDatDTO = new PieChartDTO();
        soChoTreEmDaDatDTO.setName("Số chỗ trẻ em đã đặt: ");
        soChoTreEmDaDatDTO.setValue(((Long) result[2]).intValue());
        thongKeSoCho.add(soChoTreEmDaDatDTO);

        PieChartDTO soChoTreNhoDaDatDTO = new PieChartDTO();
        soChoTreNhoDaDatDTO.setName("Số chỗ trẻ nhỏ đã đặt: ");
        soChoTreNhoDaDatDTO.setValue(((Long) result[3]).intValue());
        thongKeSoCho.add(soChoTreNhoDaDatDTO);

        PieChartDTO soChoEmBeDaDatDTO = new PieChartDTO();
        soChoEmBeDaDatDTO.setName("Số chỗ em bé đã đặt: ");
        soChoEmBeDaDatDTO.setValue(((Long) result[4]).intValue());
        thongKeSoCho.add(soChoEmBeDaDatDTO);

        return thongKeSoCho;
    }

    @Override
    public List<ThongKeDoanhThuBookingDTO> thongkeSoTienTrongThang() {
        String query = "SELECT SUM(b.tongGia) AS tong_tien_thang, MONTH(b.thoiGianDat) AS thang\n" +
                "FROM Booking AS b\n" +
                "GROUP BY MONTH(b.thoiGianDat) " +
                "ORDER BY MONTH(b.thoiGianDat) ASC";
        TypedQuery<Object[]> typedQuery = entityManager.createQuery(query, Object[].class);
        List<Object[]> results = typedQuery.getResultList();

        List<ThongKeDoanhThuBookingDTO> thongKeBookingDTOList = new ArrayList<>();
        for (Object[] result : results) {
            Long tongTienTrongThang = (Long) result[0];
            Integer thoiGianDat = (Integer) result[1];

            ThongKeDoanhThuBookingDTO bookingDTO = new ThongKeDoanhThuBookingDTO();
            bookingDTO.setThang("tháng " + thoiGianDat);
            bookingDTO.setTongTienTrongThang(tongTienTrongThang.intValue());

            thongKeBookingDTOList.add(bookingDTO);
        }
        return thongKeBookingDTOList;
    }

    @Override
    public List<BookingUserDTO> getListBookingByUserId(int userId) {
        String queryString = "SELECT t.noiKhoiHanh, t.ngayKhoiHanh, b.soChoNL, b.soChoTreEm, b.soChoTreNho,  " +
                "b.soChoEmBe, b.soNguoiThamGia, b.status, b.thoiGianDat, b.tongGia, b.nameKH, b.emailKH, b.phoneNumber, b.diaChi , b.maBooking  " +
                "FROM Booking AS b " +
                "JOIN Tour AS t ON t.maTour = b.tour " +
                "JOIN User AS u ON u.id = b.user  " +
                "WHERE u.id = " + userId;

        TypedQuery<Object[]> typedQuery = entityManager.createQuery(queryString, Object[].class);

        List<Object[]> results = typedQuery.getResultList();
        List<BookingUserDTO> bookingDTOS = new ArrayList<>();

        // Tạo đối tượng SimpleDateFormat với định dạng mong muốn
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        // Tạo đối tượng NumberFormat để định dạng số và sử dụng Locale để định dạng phù hợp với ngôn ngữ và quốc gia
        NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.getDefault());

        // Thay đổi cấu trúc của số để có dấu phân cách mỗi 3 số
        DecimalFormat decimalFormat = (DecimalFormat) numberFormat;
        DecimalFormatSymbols decimalFormatSymbols = decimalFormat.getDecimalFormatSymbols();
        decimalFormatSymbols.setGroupingSeparator('.');
        decimalFormat.setDecimalFormatSymbols(decimalFormatSymbols);

        for (Object[] result : results) {
            String noiKhoiHanh = (String) result[0];
            Date ngayKhoiHanh = (Date) result[1];
            Integer soChoNL = (Integer) result[2];
            Integer soChoTreEm = (Integer) result[3];
            Integer soChoTreNho = (Integer) result[4];
            Integer soChoEmBe = (Integer) result[5];
            Integer soNguoiThamGia = (Integer) result[6];
            Integer status = (Integer) result[7];
            String thoiGianDat = result[8].toString();
            Integer tongGia = (Integer) result[9];
            String nameKH = (String) result[10];
            String emailKH = (String) result[11];
            String phoneNumber = (String) result[12];
            String diaChi = (String) result[13];
            Integer maBooking = (Integer) result[14];

            BookingUserDTO bookingDTO = new BookingUserDTO();
            bookingDTO.setNoiKhoiHanh(noiKhoiHanh);
            bookingDTO.setSoChoNL(soChoNL);
            bookingDTO.setSoChoTreEm(soChoTreEm);
            bookingDTO.setSoChoTreNho(soChoTreNho);
            bookingDTO.setSoChoEmBe(soChoEmBe);
            bookingDTO.setSoNguoiThamGia(soNguoiThamGia);
            bookingDTO.setThoiGianDat(thoiGianDat);
            bookingDTO.setNameKH(nameKH);
            bookingDTO.setEmailKH(emailKH);
            bookingDTO.setPhoneNumber(phoneNumber);
            bookingDTO.setDiaChi(diaChi);
            bookingDTO.setMaBooking(maBooking);
            if (status == BookingStatus.BOOKING_CANCEL) {
                bookingDTO.setTrangThai("Booking bị từ chối duyệt ");
            }else if (status == BookingStatus.BOOKING_DONE) {
                bookingDTO.setTrangThai("Booking đã được duyệt ");
            }else if (status == BookingStatus.BOOKING_DRAFT) {
                bookingDTO.setTrangThai("Booking chưa được duyệt ");
            }else if (status == BookingStatus.BOOKING_DELETE) {
                bookingDTO.setTrangThai("Booking đã bị hủy ");
            }
            // Chuyển đổi ngày thành định dạng mong muốn
            Date date = ngayKhoiHanh;
            String formattedDate = dateFormat.format(date);
            bookingDTO.setNgayKhoiHanh(formattedDate);

            // Chuyển đổi giá thành định dạng mong muốn với dấu phân cách mỗi 3 số
            String formattedGiaTour = decimalFormat.format(tongGia);
            bookingDTO.setTongGia(formattedGiaTour + "đ");

            bookingDTOS.add(bookingDTO);
        }
        // Sắp xếp danh sách bookingDTOS
        List<BookingUserDTO> sortedBookings = new ArrayList<>();
        List<BookingUserDTO> deletedBookings = new ArrayList<>();
        List<BookingUserDTO> canceledBookings = new ArrayList<>();
        List<BookingUserDTO> draftBookings = new ArrayList<>();

        for (BookingUserDTO bookingDTO : bookingDTOS) {
            if (bookingDTO.getTrangThai().equals("Booking đã bị hủy")) {
                deletedBookings.add(bookingDTO);
            } else if (bookingDTO.getTrangThai().equals("Booking bị từ chối duyệt")) {
                canceledBookings.add(bookingDTO);
            } else if (bookingDTO.getTrangThai().equals("Booking chưa được duyệt")) {
                draftBookings.add(bookingDTO);
            }else {
                sortedBookings.add(bookingDTO);
            }
        }
        sortedBookings.addAll(draftBookings);
        sortedBookings.addAll(canceledBookings);
        sortedBookings.addAll(deletedBookings);

        return sortedBookings;
    }

}
