package com.vti.entity;


import javax.persistence.*;

@Entity
@Table
public class Booking {
    @Id
    private String maBooking ;

    private String nameKH ;

    private String emailKH ;

    private int phoneNumber ;

    private String diaChi ;

    private String dateOfBirth ;

    private int age ;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    public Booking(String maBooking, String nameKH, String emailKH, int phoneNumber, String diaChi, String dateOfBirth, int age, Tour tour) {
        this.maBooking = maBooking;
        this.nameKH = nameKH;
        this.emailKH = emailKH;
        this.phoneNumber = phoneNumber;
        this.diaChi = diaChi;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.tour = tour;
    }

    public Booking() {

    }

    public String getMaBooking() {
        return maBooking;
    }

    public void setMaBooking(String maBooking) {
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

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
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
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", age=" + age +
                ", tour=" + tour +
                '}';
    }
}
