package com.vti.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ThongKeBookingDTO {

    private String thoiGianDat;
    private Integer soLuongTheoThang ;

    private Date ngayDat ;
    private Integer soLuongTheoTuan ;
}
