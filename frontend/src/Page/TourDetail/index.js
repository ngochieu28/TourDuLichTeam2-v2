/* eslint-disable jsx-a11y/img-redundant-alt */
import Header from '../../conponents/Navbar'
import Footer from '../../conponents/Footer';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
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
import { Link } from 'react-router-dom';
import { Button, Grid, Card, useMediaQuery } from "@mui/material";
import ThongTinLuuY from './ThongTinLuuY';
import { useCheckLogin } from '../../util/CheckLogin'
import { useNavigate } from 'react-router-dom';
import { srcImg } from '../../api/srcImg';


export default function TourDetail() {
    const { maTour } = useParams();
    const [tours, setTours] = useState();
    const navigate = useNavigate();
    const checkLogin = useCheckLogin();
    const isMdScreen = useMediaQuery('(min-width: 960px)');

    const getTourDetail = async () => {
        const res = await tourApi.getTourDetailByMaTour(maTour);
        setTours(res);
    };

    useEffect(() => {
        getTourDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maTour]);

    // BreadCrumbs
    const BreadCrumb = () => {
        return (
            <div role="presentation" >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        to="/"
                    >
                        Du lịch trong nước
                    </Link>
                    <Typography color="text.primary">{tours?.tenTour}</Typography>
                </Breadcrumbs>
            </div>
        )
    }

    const handelClickDatNgay = (maTour) => {
        navigate(`/booking/${maTour}`);
        checkLogin();
    }

    return (
        <>
            <Header />
            <Container>
                <Grid container>
                    {isMdScreen && (
                        <Grid item md={12}>
                            <BreadCrumb />
                        </Grid>
                    )}
                </Grid>
            </Container>
            <br />
            <div className='tour-detail'>
                <Container>
                    <Grid container>
                        {isMdScreen && (
                            <Grid item md={12}>
                                <div style={{ display: 'flex', alignItems: 'center', color: '#4d4aef' }}>
                                    <ConfirmationNumberOutlinedIcon style={{ fontSize: '14px' }} />
                                    <p style={{ fontSize: '14px', marginLeft: '5px' }}>{tours?.maTour}</p>
                                </div>
                            </Grid>
                        )}
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs={12} sm={4} display={{ xs: 'none', sm: 'block', md: 'block' }}></Grid>
                                <Grid item xs={12} sm={8}>
                                    <Grid container >
                                        <Grid item xs={12} sm={12} md={6}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <h2 style={{ margin: '0', color: 'red' }}>{tours?.giaTourString}đ</h2>
                                                <span>/khách</span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6} sm={12}>
                                                    <Button variant="contained" color="error" startIcon={<AddShoppingCartIcon />} onClick={() => handelClickDatNgay(tours?.maTour)} style={{ width: '100%', margin: '5px' }}>
                                                        Đặt ngay
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} sm={12}>
                                                    <Button variant="outlined" color='inherit' style={{ width: '100%', margin: '5px' }}>Liên hệ tư vấn</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={7}>
                            <img
                                src={`${srcImg}/${tours?.image}`}
                                style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                alt="Image 1"
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Grid container spacing={1} >
                                <Grid item xs={6} >
                                    <img
                                        src={`${srcImg}/${tours?.image2}`}
                                        style={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 2"
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <img
                                        src={`${srcImg}/${tours?.image3}`}
                                        style={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 3"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={12} >
                                    <img
                                        src={`${srcImg}/${tours?.image4}`}
                                        style={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 4"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <Grid container>
                                {!isMdScreen && (
                                    <Grid item xs={12} style={{ backgroundColor: 'white', marginBottom: '20px', borderRadius: '10px', padding: '20px', boxShadow: '2px 2px 10px rgba(0,0,0,.1)' }}>
                                        <p>Mã Tour:</p><b>{tours?.maTour}</b>
                                    </Grid>
                                )}
                                <Grid item xs={12} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '2px 2px 10px rgba(0,0,0,.1)' }}>
                                    <p>Khởi hành:<b> {tours?.ngayKhoiHanh}</b></p>
                                    <p>Thời gian:<b>  {tours?.thoiGian}</b></p>
                                    <p>Nơi khởi hành:<b>  {tours?.noiKhoiHanh}</b></p>
                                    <p>Số chỗ còn nhận: <b> {tours?.soCho}</b></p>
                                </Grid>
                                {isMdScreen && (
                                    <Grid item md={12}>
                                        <p>Quý khách cần hỗ trợ?</p>
                                        <Button variant="contained" startIcon={<LocalPhoneOutlinedIcon />} style={{ height: '50px', margin: '5px' }}>
                                            Gọi điện miễn phí
                                        </Button>
                                        <Button variant="outlined" color='inherit' style={{ height: '50px', margin: '5px' }}>Gửi yêu cầu hỗ trợ</Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Grid container style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '2px 2px 10px rgba(0,0,0,.1)' }}>
                                <Grid item xs={6} sm={6} md={3}>
                                    <EmojiFlagsIcon />
                                    <p className='title-tour'>Thời gian</p>
                                    <p className='data-tour'>{tours?.thoiGian}</p>
                                </Grid>
                                <Grid item xs={6} sm={6} md={3}>
                                    <DirectionsCarFilledOutlinedIcon />
                                    <p className='title-tour'>Phương tiện </p>
                                    <p className='data-tour'>{tours?.phuongTienDiChuyen}</p>
                                </Grid>
                                <Grid item xs={6} sm={6} md={3}>
                                    <MapOutlinedIcon />
                                    <p className='title-tour'>Địa điểm tham quan</p>
                                    <p className='data-tour'>{tours?.diemThamQuan}</p>
                                </Grid>
                                <Grid item xs={6} sm={6} md={3}>
                                    <RestaurantOutlinedIcon />
                                    <p className='title-tour'>Ẩm thực</p>
                                    <p className='data-tour'>{tours?.amThuc}</p>
                                </Grid>
                                <Grid item xs={6} sm={6} md={3}>
                                    <HomeWorkOutlinedIcon />
                                    <p className='title-tour'>Khách sạn</p>
                                    <p className='data-tour'>{tours?.khachSan}</p>
                                </Grid>
                                <Grid item xs={6} sm={6} md={3}>
                                    <AccessTimeOutlinedIcon />
                                    <p className='title-tour'>Thời gian lý tưởng</p>
                                    <p className='data-tour'>{tours?.thoiGianLyTuong}</p>
                                </Grid>
                                <Grid item xs={6} sm={6} md={3}>
                                    <GroupsOutlinedIcon />
                                    <p className='title-tour'>Đối tượng thích hợp</p>
                                    <p className='data-tour'>{tours?.doiTuongThichHop}</p>
                                </Grid>
                                <Grid item xs={6} sm={6} md={3}>
                                    <LocalActivityOutlinedIcon />
                                    <p className='title-tour'>Ưu đãi</p>
                                    <p className='data-tour'>{tours?.uuDai}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container>
                <div >
                    <Card variant="outlined" className='lich-trinh-tour'>
                        <h2 style={{ textAlign: 'center' }}>Lịch trình</h2>
                        <div dangerouslySetInnerHTML={{ __html: tours?.lichTrinh }} />
                    </Card>
                </div>
                <ThongTinLuuY />
            </Container >
            <Footer />
        </>
    )
}

