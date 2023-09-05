package com.vti.service;

import com.vti.dto.TourDTO;
import com.vti.dto.TourDetailDTO;
import com.vti.dto.filter.TourFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ITourSevice {
    Page<TourDTO> getAllTour(Pageable pageable, TourFilter filter, String searchThoiGian, String searchNoiKhoiHanh, String searchDiemDen);
    TourDTO getTourByMaTour(String maTour);
    TourDetailDTO getDetailTourByMaTour(String maTour);
    void createTour(TourDetailDTO tourDetailDTO);
    void updateSoChoTour(String maTour, Integer soChoDaDat);
    void updateTour(String maTour, TourDetailDTO tourDetailDTO);
    void deleteTour(String maTour);
    void updateImageTour(String maTour,Integer indexImage, String nameImg);
}
