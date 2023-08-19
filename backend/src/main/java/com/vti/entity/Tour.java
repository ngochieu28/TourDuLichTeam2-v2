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

	@Column( columnDefinition = "TEXT")
	private String lichTrinh;

	@OneToMany(mappedBy = "tour")
	private List<Booking> bookings;

	public Tour() {

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

	public String getMaTour() {
		return maTour;
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

	public String getImage2() {
		return image2;
	}

	public void setImage2(String image2) {
		this.image2 = image2;
	}

	public String getImage3() {
		return image3;
	}

	public void setImage3(String image3) {
		this.image3 = image3;
	}

	public String getImage4() {
		return image4;
	}

	public void setImage4(String image4) {
		this.image4 = image4;
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

	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}
}
