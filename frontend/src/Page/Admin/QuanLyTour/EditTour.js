/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { useParams } from 'react-router-dom';
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
import { Button, Grid, Card, TextField, InputAdornment } from "@mui/material";
import tourApi from '../../../api/tourApi';
import { srcImg } from '../../../util/srcImg';

export default function TourDetail() {
    const { maTour } = useParams();
    const [tours, setTours] = useState();


    const getTourDetail = async () => {
        const res = await tourApi.getTourDetailByMaTour(maTour);
        setTours(res);
    };

    useEffect(() => {
        getTourDetail()
    }, [maTour]);

    const handelApDung = () => {

    }

    return (
        <>
            <div className='tour-detail'>
                <Container>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#4d4aef' }}>
                        <ConfirmationNumberOutlinedIcon style={{ fontSize: '14px' }} />
                        <p style={{ fontSize: '14px', marginLeft: '5px' }}>{tours?.maTour}</p>
                    </div>
                    <Grid container>
                        <Grid item xs='6'>
                            <h2 style={{ margin: '0', color: '#2d4271' }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    value={tours?.tenTour}

                                />
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ThumbUpOutlinedIcon style={{ fontSize: '50px', margin: '10px' }} />
                                <div >
                                    <p>Tuyệt vời</p>
                                    <p style={{ fontSize: '14px' }}> <TextField
                                        fullWidth
                                        variant="standard"
                                        value={tours?.luotQuanTam}

                                    /></p>
                                </div>
                                <Button style={{ padding: '10px', fontSize: '25px' }}><FavoriteOutlinedIcon style={{ color: 'red', fontSize: '35px' }} />126</Button>
                            </div>
                        </Grid>
                        <Grid item xs='6'>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs='8'>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <h2 style={{ margin: '0', color: 'red' }}>
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                value={tours?.giaTour}

                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">đ</InputAdornment>
                                                }}
                                            />
                                        </h2>

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
                        <Grid item xs={7} >
                            <img
                                src={`${srcImg}/${tours?.image}`}
                                style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                alt="Image 1"
                            />
                        </Grid>
                        <Grid item xs={5} >
                            <Grid container spacing={1} >
                                <Grid item xs={6} >
                                    <img
                                        src={` http://192.168.1.163:4000/${tours?.image2}`}
                                        style={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 2"
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <img
                                        src={` http://192.168.1.163:4000/${tours?.image3}`}
                                        style={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 3"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={12} >
                                    <img
                                        src={` http://192.168.1.163:4000/${tours?.image4}`}
                                        style={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 4"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} style={{ margin: '0' }}>
                        <Grid item xs='5'>
                            <div style={{ backgroundColor: 'white', marginBottom: '20px', borderRadius: '10px', padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ marginRight: '10px' }}>Khởi hành:</p>
                                    <TextField

                                        variant="standard"
                                        value={tours?.ngayKhoiHanh}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ marginRight: '10px' }}>Thời gian:</p>
                                    <TextField

                                        variant="standard"
                                        value={tours?.thoiGian}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ marginRight: '10px' }}>Nơi khởi hành:</p>
                                    <TextField

                                        variant="standard"
                                        value={tours?.noiKhoiHanh}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ marginRight: '10px' }}>Số chỗ còn nhận:</p>
                                    <TextField
                                        variant="standard"
                                        value={tours?.soCho}
                                    />
                                </div>
                            </div>
                            <div>
                                <p>Quý khách cần hỗ trợ?</p>
                                <Button variant="contained" startIcon={<LocalPhoneOutlinedIcon />} style={{ height: '50px', margin: '5px' }}>
                                    Gọi điện miễn phí
                                </Button>
                                <Button variant="outlined" color='inherit' style={{ height: '50px', margin: '5px' }}>Gửi yêu cầu hỗ trợ</Button>
                            </div>
                        </Grid>
                        <Grid item xs='7'>
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <EmojiFlagsIcon />
                                    <p className='title-tour'>Thời gian</p>
                                    <TextField
                                        variant="standard"
                                        value={tours?.thoiGian}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <DirectionsCarFilledOutlinedIcon />
                                    <p className='title-tour'>Phương tiện</p>
                                    <TextField
                                        variant="standard"
                                        value={tours?.phuongTienDiChuyen}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MapOutlinedIcon />
                                    <p className='title-tour'>Địa điểm tham quan</p>
                                    <TextField
                                        variant="standard"
                                        value={tours?.diemThamQuan}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <RestaurantOutlinedIcon />
                                    <p className='title-tour'>Ẩm thực</p>
                                    <TextField
                                        variant="standard"
                                        value={tours?.amThuc}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <HomeWorkOutlinedIcon />
                                    <p className='title-tour'>Khách sạn</p>
                                    <TextField
                                        variant="standard"
                                        value={tours?.khachSan}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <AccessTimeOutlinedIcon />
                                    <p className='title-tour'>Thời gian lý tưởng</p>
                                    <TextField
                                        variant="standard"
                                        value={tours?.thoiGianLyTuong}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <GroupsOutlinedIcon />
                                    <p className='title-tour'>Đối tượng thích hợp</p>
                                    <TextField
                                        variant="standard"
                                        value={tours?.doiTuongThichHop}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <LocalActivityOutlinedIcon />
                                    <p className='title-tour'>Ưu đãi</p>
                                    <TextField
                                        variant="standard"
                                        value={tours?.uuDai}
                                    />
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
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="contained" style={{ margin: '5px' }} onClick={handelApDung}>
                        Áp dụng
                    </Button>
                    <Button variant="outlined" color='inherit' style={{ margin: '5px' }}><Link to={'/admin/quan-ly-tour'}>Hủy</Link></Button>
                </div>
            </Container >


        </>
    )
}

