package com.vti.controller;

import java.util.List;

import com.vti.dto.TourDTO;
import com.vti.dto.filter.GroupFilter;
import com.vti.dto.filter.TourFilter;
import com.vti.entity.Tour;
import com.vti.service.ITourSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping(value = "api/v1/tours")
public class TourController {
    @Autowired
    private ITourSevice service;

    @GetMapping()
    public ResponseEntity<?> getAllTours(
            Pageable pageable,
            TourFilter filter,
            @RequestParam(required = false)
                    String searchThoiGian, String searchNoiKhoiHanh, String searchDiemDen) {
        Page<TourDTO> entities = service.getAllTour(pageable, filter, searchThoiGian, searchNoiKhoiHanh, searchDiemDen);
        return new ResponseEntity<>(entities, HttpStatus.OK);
    }

    @GetMapping(value = "/{maTour}")
    public ResponseEntity<?> getTourByMaTour(@PathVariable(name = "maTour") String maTour) {
        return new ResponseEntity<>(service.getTourByMaTour(maTour), HttpStatus.OK);
    }

    @GetMapping(value = "detail/{maTour}")
    public ResponseEntity<?> findTourDetailByMaTour(@PathVariable(name = "maTour") String maTour) {
        return new ResponseEntity<>(service.getDetailTourByMaTour(maTour), HttpStatus.OK);
    }
}
