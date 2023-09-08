package com.vti.entity;


import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Tour {
	@Id
	private String maTour ;
	private String tenTour ;
	private Integer giaTour ;
	private Integer giaTreEm;
	private Integer giaTreNho;
	private Integer giaEmBe;
	private String image ;
	private String image2 ;
	private String image3 ;
	private String image4 ;
	private Integer luotQuanTam ;
	private String thoiGian ;
	private String phuongTienDiChuyen	 ;
	private String diemThamQuan ;
	private String amThuc ;
	private String khachSan ;
	private String thoiGianLyTuong ;
	private String doiTuongThichHop ;
	private String uuDai ;
	private String noiKhoiHanh ;
	private Date ngayKhoiHanh ;
	private String diemNhan ;
	private Integer soCho ;
	private Integer soChoFull;


	@Column( columnDefinition = "TEXT")
	private String lichTrinh;

	@OneToMany(mappedBy = "tour")
	private List<Booking> bookings;

	public Tour(String maTour, String tenTour, Integer giaTour, String image, String image2, String image3, String image4, Integer luotQuanTam, String thoiGian, String phuongTienDiChuyen, String diemThamQuan, String amThuc, String khachSan, String thoiGianLyTuong, String doiTuongThichHop, String uuDai, String noiKhoiHanh, Date ngayKhoiHanhDate, Integer soCho, String lichTrinh) {
		this.maTour = UUID.randomUUID().toString();
		this.tenTour = tenTour;
		this.giaTour = giaTour;
		this.image = image;
		this.image2 = image2;
		this.image3 = image3;
		this.image4 = image4;
		this.luotQuanTam = luotQuanTam;
		this.thoiGian = thoiGian;
		this.phuongTienDiChuyen = phuongTienDiChuyen;
		this.diemThamQuan = diemThamQuan;
		this.amThuc = amThuc;
		this.khachSan = khachSan;
		this.thoiGianLyTuong = thoiGianLyTuong;
		this.doiTuongThichHop = doiTuongThichHop;
		this.uuDai = uuDai;
		this.noiKhoiHanh = noiKhoiHanh;
		this.ngayKhoiHanh = ngayKhoiHanhDate;
		this.soCho = soCho;
		this.soChoFull= soCho;
		this.lichTrinh = lichTrinh;
	}
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
