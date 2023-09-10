package com.vti.dto;

import lombok.Data;

@Data
public class BookingUserDTO {
    private String noiKhoiHanh ;
    private String ngayKhoiHanh ;
    private Integer soChoNL ;
    private Integer soChoTreEm ;
    private Integer soChoTreNho ;
    private Integer soChoEmBe ;
    private String tongGia ;
    private Integer soNguoiThamGia;
    private String trangThai;
    private String thoiGianDat;
    private String nameKH ;
    private String emailKH ;
    private String phoneNumber ;
    private String diaChi ;
    private Integer maBooking ;
}
