package com.vti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

}
