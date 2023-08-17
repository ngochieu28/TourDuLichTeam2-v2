package com.vti.entity;

import javax.persistence.*;

@Entity
@Table
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maBooking ;

    private String nameKH ;

    private String emailKH ;

    private String phoneNumber ;

    private String diaChi ;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    public Booking(int maBooking, String nameKH, String emailKH, String phoneNumber, String diaChi, Tour tour) {
        this.maBooking = maBooking;
        this.nameKH = nameKH;
        this.emailKH = emailKH;
        this.phoneNumber = phoneNumber;
        this.diaChi = diaChi;
        this.tour = tour;
    }

    public Booking() {

    }

    public int getMaBooking() {
        return maBooking;
    }

    public void setMaBooking(int maBooking) {
        this.maBooking = maBooking;
    }

    public String getNameKH() {
        return nameKH;
    }

    public void setNameKH(String nameKH) {
        this.nameKH = nameKH;
    }

    public String getEmailKH() {
        return emailKH;
    }

    public void setEmailKH(String emailKH) {
        this.emailKH = emailKH;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public Tour getTour() {
        return tour;
    }

    public void setTour(Tour tour) {
        this.tour = tour;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "maBooking='" + maBooking + '\'' +
                ", nameKH='" + nameKH + '\'' +
                ", emailKH='" + emailKH + '\'' +
                ", phoneNumber=" + phoneNumber +
                ", diaChi='" + diaChi + '\'' +
                ", tour=" + tour +
                '}';
    }
}
