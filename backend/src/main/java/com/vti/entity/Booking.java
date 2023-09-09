package com.vti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

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

    private Integer tongGia ;

    private Integer soNguoiThamGia ;

    private LocalDate thoiGianDat = LocalDate.now();

    private int status = BookingStatus.BOOKING_DONE ;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Tour getTour() {
        return tour;
    }

    public void setTour(Tour tour) {
        this.tour = tour;
    }

    public void setSoNguoiThamGia() {
        this.soNguoiThamGia = this.soChoNL + this.soChoTreEm + this.soChoTreNho + this.soChoEmBe;
    }
}
