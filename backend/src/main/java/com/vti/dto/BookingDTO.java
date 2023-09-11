package com.vti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Integer id ;
    private int maBooking ;
    private String nameKH ;
    private String emailKH ;
    private String phoneNumber ;
    private String diaChi ;
    private Integer soChoNL ;
    private Integer soChoNguoiLon ;
    private Integer soChoTreEm ;
    private Integer soChoTreNho ;
    private Integer soChoEmBe ;
    private Integer tongGia ;
    private String status ;
    private String tourId ;
}
