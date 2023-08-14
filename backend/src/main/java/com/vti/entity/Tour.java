package com.vti.entity;


import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table
public class Tour {
	@Id
	private String maTour ;
	private String tenTour ;
	private Integer giaTour ;
	private String image ;
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
	private String diemDen ;
	private String diemNhan ;
	private Integer soCho ;
	private String lichTrinh;

	@OneToMany(mappedBy = "tour")
	private List<Booking> bookings;

	public Tour() {

	}

	public Tour(String maTour, String tenTour, Integer giaTour, String image, Integer luotQuanTam, String thoiGian, String phuongTienDiChuyen, String diemThamQuan, String amThuc, String khachSan, String thoiGianLyTuong, String doiTuongThichHop, String uuDai, String noiKhoiHanh, Date ngayKhoiHanh, String diemDen, String diemNhan, Integer soCho, String lichTrinh) {
		this.maTour = maTour;
		this.tenTour = tenTour;
		this.giaTour = giaTour;
		this.image = image;
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
		this.ngayKhoiHanh = ngayKhoiHanh;
		this.diemDen = diemDen;
		this.diemNhan = diemNhan;
		this.soCho = soCho;
		this.lichTrinh = lichTrinh;
	}

	public String getMaTour() {
		return maTour;
	}

	public String getDiemDen() {
		return diemDen;
	}

	public void setDiemDen(String diemDen) {
		this.diemDen = diemDen;
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

	public Integer getGiaTour() {
		return giaTour;
	}

	public void setGiaTour(Integer giaTour) {
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

	public String getPhuongTienDiChuyen() {
		return phuongTienDiChuyen;
	}

	public void setPhuongTienDiChuyen(String phuongTienDiChuyen) {
		this.phuongTienDiChuyen = phuongTienDiChuyen;
	}

	public String getDiemThamQuan() {
		return diemThamQuan;
	}

	public void setDiemThamQuan(String diemThamQuan) {
		this.diemThamQuan = diemThamQuan;
	}

	public String getAmThuc() {
		return amThuc;
	}

	public void setAmThuc(String amThuc) {
		this.amThuc = amThuc;
	}

	public String getKhachSan() {
		return khachSan;
	}

	public void setKhachSan(String khachSan) {
		this.khachSan = khachSan;
	}

	public String getThoiGianLyTuong() {
		return thoiGianLyTuong;
	}

	public void setThoiGianLyTuong(String thoiGianLyTuong) {
		this.thoiGianLyTuong = thoiGianLyTuong;
	}

	public String getDoiTuongThichHop() {
		return doiTuongThichHop;
	}

	public void setDoiTuongThichHop(String doiTuongThichHop) {
		this.doiTuongThichHop = doiTuongThichHop;
	}

	public String getUuDai() {
		return uuDai;
	}

	public void setUuDai(String uuDai) {
		this.uuDai = uuDai;
	}

	public String getNoiKhoiHanh() {
		return noiKhoiHanh;
	}

	public void setNoiKhoiHanh(String noiKhoiHanh) {
		this.noiKhoiHanh = noiKhoiHanh;
	}

	public Date getNgayKhoiHanh() {
		return ngayKhoiHanh;
	}

	public void setNgayKhoiHanh(Date ngayKhoiHanh) {
		this.ngayKhoiHanh = ngayKhoiHanh;
	}

	public String getDiemNhan() {
		return diemNhan;
	}

	public void setDiemNhan(String diemNhan) {
		this.diemNhan = diemNhan;
	}

	public Integer getSoCho() {
		return soCho;
	}

	public void setSoCho(Integer soCho) {
		this.soCho = soCho;
	}

	public String getLichTrinh() {
		return lichTrinh;
	}

	public void setLichTrinh(String lichTrinh) {
		this.lichTrinh = lichTrinh;
	}
}
