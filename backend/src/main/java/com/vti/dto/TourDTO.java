package com.vti.dto;

import java.util.Date;

public class TourDTO {
    private String maTour ;
    private String tenTour ;
    private String giaTour ;
    private String image ;
    private Integer luotQuanTam ;
    private String thoiGian ;
    private String noiKhoiHanh ;
    private Integer soCho ;
    private String ngayKhoiHanh ;

    public String getMaTour() {
        return maTour;
    }

    public void setMaTour(String maTour) {
        this.maTour = maTour;
    }

    public String getTenTour() {
        return tenTour;
    }

    public void setTenTour(String tenTour) {
        this.tenTour = tenTour;
    }

    public String getGiaTour() {
        return giaTour;
    }

    public void setGiaTour(String giaTour) {
        this.giaTour = giaTour;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getLuotQuanTam() {
        return luotQuanTam;
    }

    public void setLuotQuanTam(Integer luotQuanTam) {
        this.luotQuanTam = luotQuanTam;
    }

    public String getThoiGian() {
        return thoiGian;
    }

    public void setThoiGian(String thoiGian) {
        this.thoiGian = thoiGian;
    }

    public String getNoiKhoiHanh() {
        return noiKhoiHanh;
    }

    public void setNoiKhoiHanh(String noiKhoiHanh) {
        this.noiKhoiHanh = noiKhoiHanh;
    }

    public Integer getSoCho() {
        return soCho;
    }

    public void setSoCho(Integer soCho) {
        this.soCho = soCho;
    }

    public String getNgayKhoiHanh() {
        return ngayKhoiHanh;
    }

    public void setNgayKhoiHanh(String ngayKhoiHanh) {
        this.ngayKhoiHanh = ngayKhoiHanh;
    }
}
