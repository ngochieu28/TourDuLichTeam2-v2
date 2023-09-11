package com.vti.service;

import com.vti.dto.*;
import com.vti.dto.filter.TourFilter;
import com.vti.entity.Tour;
import com.vti.repository.TourRepository;
import com.vti.specification.TourSpecificationBuilder;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
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
    @PersistenceContext
    private EntityManager entityManager;

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
        int idCounter = 1;
        // Lặp qua danh sách Tour và chuyển đổi ngày và giá thành định dạng mong muốn
        for (Tour tour : tours.getContent()) {
            // Tạo một đối tượng TourDTO mới
            TourDTO tourDTO = new TourDTO();

            // Sao chép các thuộc tính từ Tour sang TourDTO
            tourDTO.setId(idCounter++);
            tourDTO.setMaTour(tour.getMaTour());
            tourDTO.setTenTour(tour.getTenTour());
            tourDTO.setImage(tour.getImage());
            tourDTO.setLuotQuanTam(tour.getLuotQuanTam());
            tourDTO.setThoiGian(tour.getThoiGian());
            tourDTO.setNoiKhoiHanh(tour.getNoiKhoiHanh());
            tourDTO.setSoCho(tour.getSoCho());
            tourDTO.setGiaTour(tour.getGiaTour());
            tourDTO.setNgayKhoiHanhDate(tour.getNgayKhoiHanh());

            // Chuyển đổi ngày thành định dạng mong muốn
            Date date = tour.getNgayKhoiHanh();
            String formattedDate = dateFormat.format(date);
            tourDTO.setNgayKhoiHanh(formattedDate);

            // Chuyển đổi giá thành định dạng mong muốn với dấu phân cách mỗi 3 số
            String formattedGiaTour = decimalFormat.format(tour.getGiaTour());
            tourDTO.setGiaTourString(formattedGiaTour);

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
        tourDTO.setGiaTourString(formattedGiaTour);

        String formattedGiaTreEm = decimalFormat.format(tour.getGiaTreEm());
        tourDTO.setGiaTreEm(formattedGiaTreEm);

        String formattedGiaTreNho = decimalFormat.format(tour.getGiaTreNho());
        tourDTO.setGiaTreNho(formattedGiaTreNho);

        String formattedGiaEmBe = decimalFormat.format(tour.getGiaEmBe());
        tourDTO.setGiaEmBe(formattedGiaEmBe);

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
            tourDTO.setImage2(tour.getImage2());
            tourDTO.setImage3(tour.getImage3());
            tourDTO.setImage4(tour.getImage4());
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
            tourDTO.setGiaTour(tour.getGiaTour());
            tourDTO.setGiaEmBe(tour.getGiaEmBe());
            tourDTO.setGiaTreNho(tour.getGiaTreNho());
            tourDTO.setGiaTreEm(tour.getGiaTreEm());
            tourDTO.setNgayKhoiHanhDate(tour.getNgayKhoiHanh());

        // Chuyển đổi ngày thành định dạng mong muốn
        Date date = tour.getNgayKhoiHanh();
        String formattedDate = dateFormat.format(date);
            tourDTO.setNgayKhoiHanh(formattedDate);

        // Chuyển đổi giá thành định dạng mong muốn với dấu phân cách mỗi 3 số
        String formattedGiaTour = decimalFormat.format(tour.getGiaTour());
            tourDTO.setGiaTourString(formattedGiaTour);

        String formattedGiaTreEm = decimalFormat.format(tour.getGiaTreEm());
        tourDTO.setGiaTreEmString(formattedGiaTreEm);

        String formattedGiaTreNho = decimalFormat.format(tour.getGiaTreNho());
        tourDTO.setGiaTreNhoString(formattedGiaTreNho);

        String formattedGiaEmBe = decimalFormat.format(tour.getGiaEmBe());
        tourDTO.setGiaEmBeString(formattedGiaEmBe);

            return tourDTO;
    }

    @Override
    public void createTour(TourDetailDTO tourDetailDTO) {
        repository.save(tourDetailDTO.toEntity());
    }

    @Override
    public void updateSoChoTour(String maTour, Integer soChoDaDat) {
        // Tìm kiếm tour theo mã tour
        Tour tour = repository.findByMaTour(maTour);
        // Kiểm tra xem tour có tồn tại hay không
        if (tour == null) {
            // Nếu không tìm thấy tour, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            try {
                throw new NotFoundException("Tour not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }

        tour.setSoCho(tour.getSoCho() - soChoDaDat);
        repository.save(tour);
    }

    @Override
    public void updateTour(String maTour, TourDetailDTO tourDetailDTO) {
        // Tìm kiếm tour theo mã tour
        Tour tour = repository.findByMaTour(maTour);
        // Kiểm tra xem tour có tồn tại hay không
        if (tour == null) {
            // Nếu không tìm thấy tour, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            try {
                throw new NotFoundException("Tour not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }

        if (tourDetailDTO.getTenTour() != null) {
            tour.setTenTour(tourDetailDTO.getTenTour());
        }
        if (tourDetailDTO.getGiaTour() != null) {
            tour.setGiaTour(tourDetailDTO.getGiaTour());
        }
        if (tourDetailDTO.getImage() != null) {
            tour.setImage(tourDetailDTO.getImage());
        }
        if (tourDetailDTO.getImage2() != null) {
            tour.setImage2(tourDetailDTO.getImage2());
        }
        if (tourDetailDTO.getImage3() != null) {
            tour.setImage3(tourDetailDTO.getImage3());
        }
        if (tourDetailDTO.getImage4() != null) {
            tour.setImage4(tourDetailDTO.getImage4());
        }
        if (tourDetailDTO.getLuotQuanTam() != null) {
            tour.setLuotQuanTam(tourDetailDTO.getLuotQuanTam());
        }
        if (tourDetailDTO.getThoiGian() != null) {
            tour.setThoiGian(tourDetailDTO.getThoiGian());
        }
        if (tourDetailDTO.getPhuongTienDiChuyen() != null) {
            tour.setPhuongTienDiChuyen(tourDetailDTO.getPhuongTienDiChuyen());
        }
        if (tourDetailDTO.getDiemThamQuan() != null) {
            tour.setDiemThamQuan(tourDetailDTO.getDiemThamQuan());
        }
        if (tourDetailDTO.getAmThuc() != null) {
            tour.setAmThuc(tourDetailDTO.getAmThuc());
        }
        if (tourDetailDTO.getKhachSan() != null) {
            tour.setKhachSan(tourDetailDTO.getKhachSan());
        }
        if (tourDetailDTO.getThoiGianLyTuong() != null) {
            tour.setThoiGianLyTuong(tourDetailDTO.getThoiGianLyTuong());
        }
        if (tourDetailDTO.getDoiTuongThichHop() != null) {
            tour.setDoiTuongThichHop(tourDetailDTO.getDoiTuongThichHop());
        }
        if (tourDetailDTO.getUuDai() != null) {
            tour.setUuDai(tourDetailDTO.getUuDai());
        }
        if (tourDetailDTO.getNoiKhoiHanh() != null) {
            tour.setNoiKhoiHanh(tourDetailDTO.getNoiKhoiHanh());
        }
        if (tourDetailDTO.getNgayKhoiHanhDate() != null) {
            tour.setNgayKhoiHanh(tourDetailDTO.getNgayKhoiHanhDate());
        }
        if (tourDetailDTO.getDiemNhan() != null) {
            tour.setDiemNhan(tourDetailDTO.getDiemNhan());
        }
        if (tourDetailDTO.getSoCho() != null) {
            tour.setSoCho(tourDetailDTO.getSoCho());
        }
        if (tourDetailDTO.getLichTrinh() != null) {
            tour.setLichTrinh(tourDetailDTO.getLichTrinh());
        }

        repository.save(tour);
    }

    @Transactional
    public void deleteTour(String maTour) {
        // Tìm kiếm tour theo mã tour
        Tour tour = repository.findByMaTour(maTour);
        // Kiểm tra xem tour có tồn tại hay không
        if (tour == null) {
            // Nếu không tìm thấy tour, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            try {
                throw new NotFoundException("Tour not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }else {
            repository.deleteTourByMaTour(maTour);
        }
    }

    @Override
    public void updateImageTour(String maTour,Integer indexImage, String nameImg) {
        // Tìm kiếm tour theo mã tour
        Tour tour = repository.findByMaTour(maTour);
        // Kiểm tra xem tour có tồn tại hay không
        if (tour == null) {
            // Nếu không tìm thấy tour, bạn có thể xử lý theo ý muốn, ví dụ: ném ra một Exception hoặc trả về giá trị mặc định.
            try {
                throw new NotFoundException("Tour not found");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }

        switch (indexImage){
            case 0:
                tour.setImage(nameImg);
                break;
            case 1:
                tour.setImage2(nameImg);
                break;
            case 2:
                tour.setImage3(nameImg);
                break;
            case 3:
                tour.setImage4(nameImg);
                break;
            default:
                return;
        }
        repository.save(tour);
    }

    @Override
    public List<ThongKeTourDTO> thongKeTourVoiNoiKhoiHanh() {
        String query = "SELECT t.noiKhoiHanh, COUNT(t) AS totalTours, SUM(t.soCho) " +
                "FROM Tour t " +
                "GROUP BY t.noiKhoiHanh";

        TypedQuery<Object[]> typedQuery = entityManager.createQuery(query, Object[].class);
        List<Object[]> results = typedQuery.getResultList();

        List<ThongKeTourDTO> tourDTOList = new ArrayList<>();
        for (Object[] result : results) {
            String noiKhoiHanh = (String) result[0];
            Long totalTours = (Long) result[1];
            Long soChoTrong = (Long) result[2];

            ThongKeTourDTO tourDTO = new ThongKeTourDTO();
            tourDTO.setNoiKhoiHanh(noiKhoiHanh);
            tourDTO.setTotalTour(totalTours.intValue());
            tourDTO.setSoChoTrong(soChoTrong.intValue());
            tourDTOList.add(tourDTO);
        }

        return tourDTOList;
    }

    @Override
    public List<ThongKeTourDTO> thongKeSoTourTheoThang() {
        String query = "SELECT FUNCTION('MONTH', t.ngayKhoiHanh), COUNT(t) " +
                "FROM Tour t " +
                "GROUP BY FUNCTION('MONTH', t.ngayKhoiHanh) " +
                "ORDER BY FUNCTION('MONTH', t.ngayKhoiHanh) ASC";

        TypedQuery<Object[]> typedQuery = entityManager.createQuery(query, Object[].class);
        List<Object[]> results = typedQuery.getResultList();

        List<ThongKeTourDTO> tourDTOList = new ArrayList<>();
        for (Object[] result : results) {
            Integer thang = (Integer) result[0];
            Long totalTours = (Long) result[1];

            ThongKeTourDTO tourDTO = new ThongKeTourDTO();
            tourDTO.setThang("Tháng " +thang);
            tourDTO.setTotalTour(totalTours.intValue());

            tourDTOList.add(tourDTO);
        }

        return tourDTOList;
    }

    @Override
    public List<PieChartDTO> thongKeSoCho() {
        String query = "SELECT SUM(t.soCho) AS soChoTrong, (SUM(t.soChoFull) - SUM(t.soCho)) AS soChoDaDat " +
                "FROM Tour t";

        TypedQuery<Object[]> typedQuery = entityManager.createQuery(query, Object[].class);
        Object[] result = typedQuery.getSingleResult();

        List<PieChartDTO> thongKeSoChoResultDTOs = new ArrayList<>();

        PieChartDTO soChoTrongDTO = new PieChartDTO();
        soChoTrongDTO.setName("Số chỗ trống");
        soChoTrongDTO.setValue(((Long) result[0]).intValue());
        thongKeSoChoResultDTOs.add(soChoTrongDTO);

        PieChartDTO soChoDaDatDTO = new PieChartDTO();
        soChoDaDatDTO.setName("Số chỗ đã đặt");
        soChoDaDatDTO.setValue(((Long) result[1]).intValue());
        thongKeSoChoResultDTOs.add(soChoDaDatDTO);

        return thongKeSoChoResultDTOs;
    }
}
