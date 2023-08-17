package com.vti.service;

import com.vti.dto.TourDTO;
import com.vti.dto.TourDetailDTO;
import com.vti.dto.filter.GroupFilter;
import com.vti.dto.filter.TourFilter;
import com.vti.entity.Tour;
import com.vti.repository.GroupRepository;
import com.vti.repository.TourRepository;
import com.vti.specification.GroupSpecificationBuilder;
import com.vti.specification.TourSpecificationBuilder;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
public class TourSevice implements ITourSevice{
    @Autowired
    private TourRepository repository;

    @Override
    public Page<TourDTO> getAllTour(Pageable pageable, TourFilter filter, String searchThoiGian,  String searchNoiKhoiHanh, String searchDiemDen) {
        TourSpecificationBuilder specification = new TourSpecificationBuilder(filter, searchThoiGian, searchNoiKhoiHanh, searchDiemDen);

        Page<Tour> tours = repository.findAll(specification.build(), pageable);

        // Tạo đối tượng SimpleDateFormat với định dạng mong muốn
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        // Tạo danh sách TourDTO để lưu trữ kết quả
        List<TourDTO> tourDTOs = new ArrayList<>();

        // Tạo đối tượng NumberFormat để định dạng số và sử dụng Locale để định dạng phù hợp với ngôn ngữ và quốc gia
        NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.getDefault());

        // Thay đổi cấu trúc của số để có dấu phân cách mỗi 3 số
        DecimalFormat decimalFormat = (DecimalFormat) numberFormat;
        DecimalFormatSymbols decimalFormatSymbols = decimalFormat.getDecimalFormatSymbols();
        decimalFormatSymbols.setGroupingSeparator('.');
        decimalFormat.setDecimalFormatSymbols(decimalFormatSymbols);

        // Lặp qua danh sách Tour và chuyển đổi ngày và giá thành định dạng mong muốn
        for (Tour tour : tours.getContent()) {
            // Tạo một đối tượng TourDTO mới
            TourDTO tourDTO = new TourDTO();

            // Sao chép các thuộc tính từ Tour sang TourDTO
            tourDTO.setMaTour(tour.getMaTour());
            tourDTO.setTenTour(tour.getTenTour());
            tourDTO.setImage(tour.getImage());
            tourDTO.setLuotQuanTam(tour.getLuotQuanTam());
            tourDTO.setThoiGian(tour.getThoiGian());
            tourDTO.setNoiKhoiHanh(tour.getNoiKhoiHanh());
            tourDTO.setSoCho(tour.getSoCho());

            // Chuyển đổi ngày thành định dạng mong muốn
            Date date = tour.getNgayKhoiHanh();
            String formattedDate = dateFormat.format(date);
            tourDTO.setNgayKhoiHanh(formattedDate);

            // Chuyển đổi giá thành định dạng mong muốn với dấu phân cách mỗi 3 số
            String formattedGiaTour = decimalFormat.format(tour.getGiaTour());
            tourDTO.setGiaTour(formattedGiaTour);

            // Thêm TourDTO vào danh sách kết quả
            tourDTOs.add(tourDTO);
        }

        // Tạo một đối tượng Page mới với danh sách TourDTO và thông tin phân trang
        Page<TourDTO> tourDTOPage = new PageImpl<>(tourDTOs, tours.getPageable(), tours.getTotalElements());

        return tourDTOPage;
    }


    @Override
    public TourDTO getTourByMaTour(String maTour) {
        // Tìm kiếm tour theo mã tour
        Tour tour = repository.findByMaTour(maTour);

        // Kiểm tra xem tour có tồn tại hay không
        if (tour == null) {
            // Nếu không tìm thấy tour, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            // Ví dụ:
            try {
                throw new NotFoundException("Tour not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }

        // Tạo đối tượng SimpleDateFormat với định dạng mong muốn
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        // Tạo đối tượng NumberFormat để định dạng số và sử dụng Locale để định dạng phù hợp với ngôn ngữ và quốc gia
        NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.getDefault());

        // Thay đổi cấu trúc của số để có dấu phân cách mỗi 3 số
        DecimalFormat decimalFormat = (DecimalFormat) numberFormat;
        DecimalFormatSymbols decimalFormatSymbols = decimalFormat.getDecimalFormatSymbols();
        decimalFormatSymbols.setGroupingSeparator('.');
        decimalFormat.setDecimalFormatSymbols(decimalFormatSymbols);

        // Tạo một đối tượng TourDTO mới
        TourDTO tourDTO = new TourDTO();

        // Sao chép các thuộc tính từ Tour sang TourDTO
        tourDTO.setMaTour(tour.getMaTour());
        tourDTO.setTenTour(tour.getTenTour());
        tourDTO.setImage(tour.getImage());
        tourDTO.setLuotQuanTam(tour.getLuotQuanTam());
        tourDTO.setThoiGian(tour.getThoiGian());
        tourDTO.setNoiKhoiHanh(tour.getNoiKhoiHanh());
        tourDTO.setSoCho(tour.getSoCho());

        // Chuyển đổi ngày thành định dạng mong muốn
        Date date = tour.getNgayKhoiHanh();
        String formattedDate = dateFormat.format(date);
        tourDTO.setNgayKhoiHanh(formattedDate);

        // Chuyển đổi giá thành định dạng mong muốn với dấu phân cách mỗi 3 số
        String formattedGiaTour = decimalFormat.format(tour.getGiaTour());
        tourDTO.setGiaTour(formattedGiaTour);

        return tourDTO;
    }

    @Override
    public TourDetailDTO getDetailTourByMaTour(String maTour) {
        // Tìm kiếm tour theo mã tour
        Tour tour = repository.findByMaTour(maTour);

        // Kiểm tra xem tour có tồn tại hay không
        if (tour == null) {
            // Nếu không tìm thấy tour, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            // Ví dụ:
            try {
                throw new NotFoundException("Tour not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        // Tạo đối tượng SimpleDateFormat với định dạng mong muốn
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        // Tạo đối tượng NumberFormat để định dạng số và sử dụng Locale để định dạng phù hợp với ngôn ngữ và quốc gia
        NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.getDefault());

        // Thay đổi cấu trúc của số để có dấu phân cách mỗi 3 số
        DecimalFormat decimalFormat = (DecimalFormat) numberFormat;
        DecimalFormatSymbols decimalFormatSymbols = decimalFormat.getDecimalFormatSymbols();
        decimalFormatSymbols.setGroupingSeparator('.');
        decimalFormat.setDecimalFormatSymbols(decimalFormatSymbols);

        // Tạo một đối tượng TourDTO mới
        TourDetailDTO tourDTO = new TourDetailDTO();

        // Sao chép các thuộc tính từ Tour sang TourDTO
            tourDTO.setMaTour(tour.getMaTour());
            tourDTO.setTenTour(tour.getTenTour());
            tourDTO.setImage(tour.getImage());
            tourDTO.setLuotQuanTam(tour.getLuotQuanTam());
            tourDTO.setThoiGian(tour.getThoiGian());
            tourDTO.setPhuongTienDiChuyen(tour.getPhuongTienDiChuyen());
            tourDTO.setDiemThamQuan(tour.getDiemThamQuan());
            tourDTO.setAmThuc(tour.getAmThuc());
            tourDTO.setKhachSan(tour.getKhachSan());
            tourDTO.setThoiGianLyTuong(tour.getThoiGianLyTuong());
            tourDTO.setDoiTuongThichHop(tour.getDoiTuongThichHop());
            tourDTO.setUuDai(tour.getUuDai());
            tourDTO.setNoiKhoiHanh(tour.getNoiKhoiHanh());
            tourDTO.setDiemNhan(tour.getDiemNhan());
            tourDTO.setSoCho(tour.getSoCho());
            tourDTO.setLichTrinh(tour.getLichTrinh());

        // Chuyển đổi ngày thành định dạng mong muốn
        Date date = tour.getNgayKhoiHanh();
        String formattedDate = dateFormat.format(date);
            tourDTO.setNgayKhoiHanh(formattedDate);

        // Chuyển đổi giá thành định dạng mong muốn với dấu phân cách mỗi 3 số
        String formattedGiaTour = decimalFormat.format(tour.getGiaTour());
            tourDTO.setGiaTour(formattedGiaTour);

            return tourDTO;
    }

}
