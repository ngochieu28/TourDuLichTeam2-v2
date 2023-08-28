/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { InputBase } from "@mui/material";

const Footer = () => (
    <footer className="footer">
        <Container >
            <Grid container >
                <Grid xs={6} sm={3} className="text-left">
                    <h4><a href="#" style={{ textDecoration: 'none' }}>
                        Du lịch trong nước
                    </a></h4>
                    <Grid container>
                        <Grid xs={12} sm={6}>
                            <ul>
                                <li>
                                    <span className="text-muted" href="#">
                                        Hà Nội
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Hạ Long
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Huế
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Quảng Bình
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Đà Nẵng
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Quảng Nam
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Nha Trang
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Đà Lạt
                                    </span>
                                </li>
                            </ul>
                        </Grid >
                        <Grid xs={12} sm={6}>
                            <ul className="list-unstyled">
                                <li>
                                    <span className="text-muted" href="#">
                                        Phan Thiết
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Bà Rịa - Vũng Tàu
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Phú Quốc
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Cần Thơ
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Hà Kiên
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Bắc Kạn
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Hà Giang
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Côn Đảo
                                    </span>
                                </li>
                            </ul>
                        </Grid >
                    </Grid >
                </Grid >
                <Grid xs={6} sm={3} className="text-left">
                    <h4><a href="#" style={{ textDecoration: 'none' }}>
                        Du lịch nước ngoài
                    </a></h4>
                    <Grid container>
                        <Grid xs={12} sm={6}>
                            <ul className="list-unstyled">
                                <li>
                                    <span className="text-muted" href="#">
                                        Trung Quốc
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Thái Lan
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Malaysia
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Singapo
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Hàn Quốc
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Úc
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Mĩ - Hoa kì
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Nhật bản
                                    </span>
                                </li>
                            </ul>
                        </Grid >
                        <Grid xs={12} sm={6}>
                            <ul className="list-unstyled">
                                <li>
                                    <span className="text-muted" href="#">
                                        Ấn độ
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Phillippines
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Maldives
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Na Uy
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Tây Ban Nha
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Hà Lan
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Đức
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Anh
                                    </span>
                                </li>
                            </ul>
                        </Grid >
                    </Grid >
                </Grid >
                <Grid xs={6} sm={3} className="text-left">
                    <h4><a href="#" style={{ textDecoration: 'none' }}>
                        Dòng Tour
                    </a></h4>
                    <ul>
                        <li>
                            <span className="text-muted" href="#">
                                Cao cấp
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                Tiêu chuẩn
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                Tiết kiệm
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                Giá tốt
                            </span>
                        </li>
                    </ul>
                </Grid >
                <Grid xs={6} sm={3} className="text-left" >
                    <h4><a href="#" style={{ textDecoration: 'none' }}>
                        Ứng dụng di động
                    </a></h4>
                    <Grid container>
                        <Grid xs="6">
                            <ul className="list-unstyled">
                                <li>
                                    <span className="text-muted" href="#">
                                        <img src="https://travel.com.vn/Content/Theme/images/ggp.webp" style={{ width: '100%', objectFit: 'cover' }} />
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        Android
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        <img src="https://travel.com.vn/Content/Theme/images/image42.webp" style={{ width: '100%', objectFit: 'cover' }} />
                                    </span>
                                </li>
                            </ul>
                        </Grid >
                        <Grid xs="6">
                            <ul className="list-unstyled">
                                <li>
                                    <span className="text-muted" href="#">
                                        <img src="https://travel.com.vn/Content/Theme/images/aps.webp" style={{ width: '100%', objectFit: 'cover' }} />
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        IOS
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        <img src="https://travel.com.vn/Content/Theme/images/image43.webp" style={{ width: '100%', objectFit: 'cover' }} />
                                    </span>
                                </li>
                            </ul>
                        </Grid >
                    </Grid >
                </Grid >
            </Grid >
            <Grid container spacing={1}>
                <Grid xs={6} sm={3} className="text-left">
                    <h4><a href="#" style={{ textDecoration: 'none' }}>
                        Liên hệ
                    </a></h4>

                    <ul className="list-unstyled">
                        <li>
                            <span className="text-muted" href="#">
                                190 Pasteur, Phường Võ Thị Sáu, Quận 3, TPHCM
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                (+84 28) 3822 8898
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                (+84 28) 3829 9142
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                info@vietravel.com
                            </span>
                        </li>
                    </ul>
                    <h4><a href="#" style={{ textDecoration: 'none' }}>Mạng xã hội</a></h4>
                    <div>
                        <a href="#"><FacebookIcon className="mr-2" /></a>
                        <a href="#"><InstagramIcon className="mr-2" /></a>
                        <a href="#"><TwitterIcon className="mr-2" /></a>
                        <a href="#"><YouTubeIcon className="mr-2" /></a>
                    </div>
                    <div className="mt-2" >
                        <Button className="button-hotline">
                            <LocalPhoneIcon className="mr-2" />
                            1900 1839
                        </Button>
                        <p>Từ 8:00 - 22:00 hàng ngày</p>
                    </div>
                </Grid >
                <Grid xs={6} sm={3} className="text-left">
                    <h4><a href="#" style={{ textDecoration: 'none' }}>
                        Thông tin
                    </a></h4>
                    <ul className="list-unstyled">
                        <li>
                            <span className="text-muted" href="#">
                                Tạp chí du lịch
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                Cẩm nang du lịch
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                Tin tức
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                Sitemap
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                FAQs
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                Chính sách riêng tư
                            </span>
                        </li>
                        <li>
                            <span className="text-muted" href="#">
                                Thỏa thuận sử dụng
                            </span>
                        </li>
                    </ul></Grid >
                <Grid xs="6" className="text-left" display={{ xs: 'none', sm: 'block', md: 'block' }}>
                    <div>
                        <h4><a href="#" style={{ textDecoration: 'none' }}>
                            Newsletter
                        </a></h4>
                        <Box inline className="ml-auto position-relative" >
                            <div className="position-relative" style={{ display: 'inline-block' }}>
                                {/* <TextField type="text" name="search" placeholder="Email của quý khách" />
                <MailIcon className="position-absolute top-50 end-0 translate-middle-y" /> */}
                                <InputBase
                                    placeholder="Bắt đầu tìm kiếm...."
                                    style={{ height: '50px', paddingRight: '30px', border: '2px solid #ffc709' }}
                                />
                                <MailIcon
                                    style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}
                                />
                            </div>
                        </Box>
                    </div>
                    <div className="mt-2">
                        <h4><a href="#" style={{ textDecoration: 'none' }}>
                            Tìm kiếm thông tin
                        </a></h4>
                        <Box inline className="ml-auto position-relative" >
                            <div className="position-relative" style={{ display: 'inline-block' }}>
                                <span style={{ position: "relative" }}>
                                    <InputBase
                                        placeholder="Bắt đầu tìm kiếm...."
                                        style={{ height: '50px', paddingRight: '30px', border: '2px solid #ffc709' }}
                                    />
                                    <SearchIcon
                                        style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}
                                    />
                                </span>
                            </div>
                        </Box>
                    </div>
                    <div className="d-flex mt-3">
                        <div className="mr-4">
                            <h4><a href="#" style={{ textDecoration: 'none' }}>
                                Chứng nhận
                            </a></h4>
                            <ul className="list-unstyled">
                                <li>
                                    <span className="text-muted" href="#">
                                        <img src="https://travel.com.vn/Content/Theme/images/image39.webp" alt="Chứng nhận 1" style={{ width: '100%', objectFit: 'cover' }} />
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">

                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted" href="#">
                                        <img src="https://travel.com.vn/Content/Theme/images/image40.webp" alt="Chứng nhận 2" style={{ width: '100%', objectFit: 'cover' }} />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Grid >

            </Grid >
        </Container>
    </footer>
);

export default Footer;