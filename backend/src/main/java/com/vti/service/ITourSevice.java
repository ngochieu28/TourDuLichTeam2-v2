package com.vti.service;

import com.vti.dto.TourDTO;
import com.vti.dto.TourDetailDTO;
import com.vti.dto.filter.GroupFilter;
import com.vti.dto.filter.TourFilter;
import com.vti.entity.Group;
import com.vti.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITourSevice {
    Page<TourDTO> getAllTour(Pageable pageable, TourFilter filter, String searchThoiGian, String searchNoiKhoiHanh, String searchDiemDen);
    TourDTO getTourByMaTour(String maTour);
    TourDetailDTO getDetailTourByMaTour(String maTour);
    void updateSoChoTour(String maTour, Integer soChoDaDat);
    void deleteTour(String maTour);
}
