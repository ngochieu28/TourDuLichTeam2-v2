/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../../conponents/Navbar'
import Footer from '../../conponents/Footer';
import Container from '@mui/material/Container';
import { Button, Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { useParams } from 'react-router-dom';
import tourApi from '../../api/tourApi';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

export default function TourDetail() {
    const { maTour } = useParams();

    const [tours, setTours] = useState();

    const getTourDetail = async () => {
        const res = await tourApi.getTourDetailByMaTour(maTour);
        setTours(res.data);
    };

    useEffect(() => {
        getTourDetail()
    }, [maTour]);

    // BreadCrumbs
    const BreadCrumb = () => {
        function handleClick(event) {
            event.preventDefault();
            alert('You clicked a breadcrumb.');
        }
        return (
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Du lịch trong nước
                    </Link>
                    <Typography color="text.primary">{tours?.tenTour}</Typography>

                </Breadcrumbs>
            </div>

        )
    }

    return (
        <>
            <Header />
            <Container>
                <BreadCrumb />
                <br />
                <div className='tour-detail'>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#4d4aef' }}>
                        <ConfirmationNumberOutlinedIcon style={{ fontSize: '14px' }} />
                        <p style={{ fontSize: '14px', marginLeft: '5px' }}>{tours?.maTour}</p>
                    </div>
                    <Grid container>
                        <Grid item xs='6'>
                            <h2 style={{ margin: '0', color: '#2d4271' }}>{tours?.tenTour}</h2>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ThumbUpOutlinedIcon style={{ fontSize: '50px', margin: '10px' }} />
                                <div >
                                    <p>Tuyệt vời</p>
                                    <p style={{ fontSize: '14px' }}>{tours?.luotQuanTam} quan tâm</p>
                                </div>
                                <Button style={{ padding: '10px', fontSize: '25px' }}><FavoriteOutlinedIcon style={{ color: 'red', fontSize: '35px' }} />126</Button>
                            </div>
                        </Grid>
                        <Grid item xs='6'>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs='8'>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <h2 style={{ margin: '0', color: 'red' }}>{tours?.giaTour}đ</h2>
                                        <p>/khách</p>
                                        <div style={{ marginLeft: '10px' }}>
                                            <Button variant="contained" color="error" startIcon={<AddShoppingCartIcon />} style={{ height: '50px', width: '100%', margin: '5px' }}>
                                                Đặt ngay
                                            </Button><br />
                                            <Button variant="outlined" color='inherit' style={{ height: '50px', width: '100%', margin: '5px' }}>Liên hệ tư vấn</Button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={7}>
                            <img src="https://media.travel.com.vn/tour/tfd_220222114550_377471.jpg" style={{ width: '100%', borderRadius: '10px' }} />
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <img src="https://media.travel.com.vn/tour/tfd_220222114847_374645.jpg" style={{ width: '100%', borderRadius: '10px' }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <img src="https://media.travel.com.vn/tour/tfd_220222115020_726066.jpg" style={{ width: '100%', borderRadius: '10px' }} />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <img src="https://media.travel.com.vn/destination/dc_200914_BA%20NA%20HILL%20(1)_1.jpg" style={{ width: '100%', borderRadius: '10px' }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs='5'>
                            <div style={{ backgroundColor: 'white', marginBottom: '20px', borderRadius: '10px', padding: '20px' }}>
                                <p>Khởi hành: {tours?.ngayKhoiHanh}</p>
                                <p>Thời gian: {tours?.thoiGian}</p>
                                <p>Nơi khởi hành: {tours?.noiKhoiHanh}</p>
                                <p>Số chỗ còn nhận: {tours?.soCho}</p>
                            </div>
                            <p>Quý khách cần hỗ trợ?</p>
                            <Button variant="contained" startIcon={<LocalPhoneOutlinedIcon />} style={{ height: '50px', margin: '5px' }}>
                                Gọi điện miễn phí
                            </Button>
                            <Button variant="outlined" color='inherit' style={{ height: '50px', margin: '5px' }}>Gửi yêu cầu hỗ trợ</Button>
                        </Grid>
                        <Grid item xs='7'>
                            <Grid container spacing={1}>
                                <Grid item xs='3'>
                                    <EmojiFlagsIcon />
                                    <p className='title-tour'>Thời gian</p>
                                    <p className='data-tour'>{tours?.thoiGian}</p>
                                </Grid>
                                <Grid item xs='3'>
                                    <DirectionsCarFilledOutlinedIcon />
                                    <p className='title-tour'>Phương tiện </p>
                                    <p className='data-tour'>{tours?.phuongTienDiChuyen}</p>
                                </Grid>
                                <Grid item xs='3'>
                                    <MapOutlinedIcon />
                                    <p className='title-tour'>Địa điểm tham quan</p>
                                    <p className='data-tour'>{tours?.diemThamQuan}</p>
                                </Grid>
                                <Grid item xs='3'>
                                    <RestaurantOutlinedIcon />
                                    <p className='title-tour'>Ẩm thực</p>
                                    <p className='data-tour'>{tours?.amThuc}</p>
                                </Grid>
                                <Grid item xs='3'>
                                    <HomeWorkOutlinedIcon />
                                    <p className='title-tour'>Khách sạn</p>
                                    <p className='data-tour'>{tours?.khachSan}</p>
                                </Grid>
                                <Grid item xs='3'>
                                    <AccessTimeOutlinedIcon />
                                    <p className='title-tour'>Thời gian lý tưởng</p>
                                    <p className='data-tour'>{tours?.thoiGianLyTuong}</p>
                                </Grid>
                                <Grid item xs='3'>
                                    <GroupsOutlinedIcon />
                                    <p className='title-tour'>Đối tượng thích hợp</p>
                                    <p className='data-tour'>{tours?.doiTuongThichHop}</p>
                                </Grid>
                                <Grid item xs='3'>
                                    <LocalActivityOutlinedIcon />
                                    <p className='title-tour'>Ưu đãi</p>
                                    <p className='data-tour'>{tours?.uuDai}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className='lich-trinh-tour'>
                    <h2 style={{ textAlign: 'center' }}>Lịch trình</h2>
                </div>
            </Container>
            <Footer />
        </>
    )
}

