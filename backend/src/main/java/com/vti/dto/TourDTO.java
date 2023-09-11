package com.vti.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Date;

@Getter
@Setter
public class TourDTO {
    private Integer id;
    private String maTour ;
    private String tenTour ;
    private String giaTourString ;
    private Integer giaTour ;
    private String giaTreEm;
    private String giaTreNho;
    private String giaEmBe;
    private String image ;
    private Integer luotQuanTam ;
    private String thoiGian ;
    private String noiKhoiHanh ;
    private Integer soCho ;
    private String ngayKhoiHanh ;
    private Date ngayKhoiHanhDate ;
}
