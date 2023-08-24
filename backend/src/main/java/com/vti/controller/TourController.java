package com.vti.controller;

import java.util.List;

import com.vti.dto.GroupFormForCreating;
import com.vti.dto.TourDTO;
import com.vti.dto.TourDetailDTO;
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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vti.dto.GroupFormForUpdating;


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

    @PostMapping()
    public ResponseEntity<?> createTour(@RequestBody TourDetailDTO tourDetailDTO) {
        service.createTour(tourDetailDTO);
        return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
    }

    @PutMapping(value = "updateSoCho/{maTour}")
    public ResponseEntity<?> updateSoCho(@PathVariable(name = "maTour") String maTour, @RequestBody Object requestBody) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.convertValue(requestBody, JsonNode.class);
        Integer soChoDaDat = jsonNode.get("soChoDaDat").asInt();

        service.updateSoChoTour(maTour, soChoDaDat);
        return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
    }

    @PutMapping(value = "/{maTour}")
    public ResponseEntity<?> updateTour(@PathVariable(name = "maTour") String maTour, @RequestBody TourDetailDTO tourDetailDTO) {
        service.updateTour(maTour, tourDetailDTO);
        return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
    }

    @DeleteMapping(value = "/{maTour}")
    public ResponseEntity<?> deleteTour(@PathVariable(name = "maTour") String maTour) {
        service.deleteTour(maTour);
        return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
    }
}
