package com.vti.controller;

import java.util.List;

import com.vti.dto.*;
import com.vti.dto.filter.TourFilter;
import com.vti.service.ITourSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


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

    @GetMapping(value = "/thong-ke-tour-voi-noi-khoi-hanh")
    public ResponseEntity<?> thongKeTourVoiNoiKhoiHanh() {
        List<ThongKeTourDTO> tourView = service.thongKeTourVoiNoiKhoiHanh();
        return new ResponseEntity<>(tourView, HttpStatus.OK);
    }

    @GetMapping(value = "/thong-ke-so-tour-theo-thang")
    public ResponseEntity<?> ThongKeSoTourTheoThang() {
        List<ThongKeTourDTO> tourView = service.thongKeSoTourTheoThang();
        return new ResponseEntity<>(tourView, HttpStatus.OK);
    }

    @GetMapping(value = "/thong-ke-so-cho")
    public ResponseEntity<?> ThongKeSoCho() {
        List<PieChartDTO>  tourView = service.thongKeSoCho();
        return new ResponseEntity<>(tourView, HttpStatus.OK);
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

    @PutMapping(value = "updateimage/{maTour}")
    public ResponseEntity<?> updateImage(@PathVariable(name = "maTour") String maTour, @RequestBody Object requestBody) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.convertValue(requestBody, JsonNode.class);

        Integer indexImg = null;
        if (jsonNode.has("indexImg") && !jsonNode.get("indexImg").isNull()) {
            indexImg = jsonNode.get("indexImg").asInt();
        }

        String nameImg = null;
        if (jsonNode.has("nameImg") && !jsonNode.get("nameImg").isNull()) {
            nameImg = jsonNode.get("nameImg").asText();
        }


        service.updateImageTour(maTour, indexImg, nameImg);
        return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
    }

    @DeleteMapping(value = "/{maTour}")
    public ResponseEntity<?> deleteTour(@PathVariable(name = "maTour") String maTour) {
        service.deleteTour(maTour);
        return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
    }
}
