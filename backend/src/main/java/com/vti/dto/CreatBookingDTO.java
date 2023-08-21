package com.vti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatBookingDTO {
    private int maBooking ;

    private String nameKH ;

    private String emailKH ;

    private String phoneNumber ;

    private String diaChi ;

    private String tourId ;


}
