package com.vti.dto;

import lombok.Data;

@Data
public class BookingTourDTO {

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
    private Integer giaTour ;
    private Integer giaTreEm;
    private Integer giaTreNho;
    private Integer giaEmBe;
    private String status;

    private String tourId ;
    private Integer soCho ;
    private String maTour ;
    private String tenTour ;
    private String image ;
    private String noiKhoiHanh ;
    private String ngayKhoiHanh ;
    private String thoiGian ;
    private int userId ;


    public Integer getGiaTreEm() {
        return giaTour - (giaTour * 50 / 100);
    }

    public void setGiaTreEm(Integer giaTreEm) {
        this.giaTreEm = giaTreEm;
    }

    public Integer getGiaTreNho() {
        return giaTour - (giaTour * 75 / 100);
    }

    public void setGiaTreNho(Integer giaTreNho) {
        this.giaTreNho = giaTreNho;
    }

    public Integer getGiaEmBe() {
        return giaTour - (giaTour * 90 / 100);
    }

    public void setGiaEmBe(Integer giaEmBe) {
        this.giaEmBe = giaEmBe;
    }

}
