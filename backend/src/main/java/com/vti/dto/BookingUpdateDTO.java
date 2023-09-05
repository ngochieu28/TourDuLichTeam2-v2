package com.vti.dto;

import com.vti.entity.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingUpdateDTO {
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

    private int status = BookingStatus.BOOKING_DRAFT;

    private String tourId ;
}
