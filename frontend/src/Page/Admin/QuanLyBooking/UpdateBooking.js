import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import bookingApi from '../../../api/bookingApi';
import AvataTour from '../../Booking/AvataTour';
import EditableTextField from '../../../conponents/Dialog-TextField-Data';
import HeaderBookingUpdate from '../../../conponents/Navbar'
import Footer from '../../../conponents/Footer';
import { useForm, Controller } from 'react-hook-form'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import {
    Grid, TextField, Box, Typography, Button, ButtonGroup, Divider, Container,
} from '@mui/material';
import tourApi from '../../../api/tourApi';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import { srcImg } from '../../../api/srcImg';

export default function UpdateBooking() {
    const { maBooking } = useParams();
    // const [tourBooking, setTourBooking] = useState()
    const [editBooking, setEditBooking] = useState({
        nameKH: "",
        emailKH: "",
        phoneNumber: "",
        diaChi: "",
        soChoNL: "",
        soChoTreEm: "",
        soChoTreNho: "",
        soChoEmBe: "",
        soCho: "",
        maTour: "",
        tenTour: "",
        noiKhoiHanh: "",
        thoiGian: "",
        image: "",
        ngayKhoiHanh: "",
        giaTour: "",
        giaTreEm: "",
        giaTreNho: "",
        giaEmBe: "",
    })

    const [soChoDatTrcKhiUpdate, setSoChoDatTrcKhiUpdate] = useState();

    const getBookingById = async () => {
        let res = await bookingApi.getTourBooking(maBooking)
        setSoChoDatTrcKhiUpdate(res.soChoNL + res.soChoTreEm + res.soChoTreNho + res.soChoEmBe)

        setEditBooking({
            nameKH: res.nameKH || "",
            emailKH: res.emailKH || "",
            phoneNumber: res.phoneNumber || "",
            diaChi: res.diaChi || "",
            soChoNL: res.soChoNL,
            soChoTreEm: res.soChoTreEm,
            soChoTreNho: res.soChoTreNho,
            soChoEmBe: res.soChoEmBe,
            soCho: res.soCho + (res.soChoNL + res.soChoTreEm + res.soChoTreNho + res.soChoEmBe),
            maTour: res.maTour || "",
            tenTour: res.tenTour || "",
            noiKhoiHanh: res.noiKhoiHanh || "",
            thoiGian: res.thoiGian || "",
            image: res.image || "",
            ngayKhoiHanh: res.ngayKhoiHanh || "",
            giaTour: res.giaTour || "",
            giaTreEm: res.giaTreEm || "",
            giaTreNho: res.giaTreNho || "",
            giaEmBe: res.giaEmBe || "",
        })
    }

    useEffect(() => {
        getBookingById()
    }, [maBooking])

    const handleUpdateNameKH = (updateNameKH) => {
        setEditBooking((data) => ({
            ...data,
            nameKH: updateNameKH,
        }));
    };
    const handleUpdateEmailKH = (updateEmailKH) => {
        setEditBooking((data) => ({
            ...data,
            emailKH: updateEmailKH,
        }));
    };
    const handleUpdatePhoneNumB = (updatePhoneNumB) => {
        setEditBooking((data) => ({
            ...data,
            phoneNumber: updatePhoneNumB,
        }));
    };
    const handleUpdateDicChi = (updateDicChi) => {
        setEditBooking((data) => ({
            ...data,
            diaChi: updateDicChi,
        }));
    };

    //// check tăng giảm
    const countFull = (editBooking.soChoNL) + (editBooking.soChoTreEm) + (editBooking.soChoTreNho) + (editBooking.soChoEmBe)

    const giaNguoiLon1 = (editBooking.soChoNL) * editBooking.giaTour
    const giaTreEm1 = (editBooking.soChoTreEm) * editBooking.giaTreEm
    const giaTreNho1 = (editBooking.soChoTreNho) * editBooking.giaTreNho
    const giaEmBe1 = (editBooking.soChoEmBe) * editBooking.giaEmBe
    const tongGia1 = giaNguoiLon1 + giaTreEm1 + giaTreNho1 + giaEmBe1

    const increaseAdultCount = () => {
        console.log(countFull, editBooking.soCho);
        if (countFull == editBooking.soCho) {
            alert("Số chỗ còn lại là" + editBooking.soCho)
        } else {
            setEditBooking((data) => ({
                ...data,
                soChoNL: data.soChoNL + 1,
            }));
        }
    };

    const decreaseAdultCount = () => {
        if (editBooking.soChoNL > 1) {
            setEditBooking((data) => ({
                ...data,
                soChoNL: data.soChoNL - 1,
            }));
        } else {
            alert("Số lượng không thể nhỏ hơn 1!");
        }
    };

    const increaseChildCount = () => {
        if (countFull == editBooking.soCho) {
            alert("Số chỗ còn lại là" + editBooking.soCho)
        } else {
            setEditBooking((data) => ({
                ...data,
                soChoTreEm: data.soChoTreEm + 1,
            }));
        }
    };

    const decreaseChildCount = () => {
        if (editBooking.soChoTreEm > 0) {
            setEditBooking((data) => ({
                ...data,
                soChoTreEm: data.soChoTreEm - 1,
            }));
        }
    };

    const increaseTreNho = () => {
        if (countFull == editBooking.soCho) {
            alert("Số chỗ còn lại là" + editBooking.soCho)
        } else {
            setEditBooking((data) => ({
                ...data,
                soChoTreNho: data.soChoTreNho + 1,
            }));
        }
    };

    const decreaseTreNho = () => {
        if (editBooking.soChoTreNho > 0) {
            setEditBooking((data) => ({
                ...data,
                soChoTreNho: data.soChoTreNho - 1,
            }));
        }
    };

    const increaseEmbe = () => {
        if (countFull == editBooking.soCho) {
            alert("Số chỗ còn lại là" + editBooking.soCho)
        } else {
            setEditBooking((data) => ({
                ...data,
                soChoEmBe: data.soChoEmBe + 1,
            }));
        }
    };

    const decreaseEmbe = () => {
        console.log(soChoDatTrcKhiUpdate);
        if (editBooking.soChoEmBe > 0) {
            setEditBooking((data) => ({
                ...data,
                soChoEmBe: data.soChoEmBe - 1,
            }));
        }
    };

    // set lại số chỗ tour 

    const updateSochoTour = async () => {
        const data = { "soChoDaDat": countFull - soChoDatTrcKhiUpdate }
        const res = await tourApi.updateSoChoTour(editBooking.maTour, data)
        toast.success('Đặt thành công!');
    }

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleUpdate = async () => {
        console.log(maBooking, editBooking);
        setOpen(true);
        let res = await bookingApi.updateBooking(maBooking, editBooking)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSnackbarOpen(true);
            setOpen(false);
        }, 3000);
        updateSochoTour()
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <HeaderBookingUpdate />
            <Container>
                <Grid container >
                    <Grid item xs='12'>
                        <Typography variant="h3" my={1}>Thông Tin Chuyến Đi</Typography>
                        <Grid container >
                            <Grid item xs='4' >
                                <img
                                    src={`${srcImg}/${editBooking?.image}`}
                                    style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    alt="Image 1"
                                />
                            </Grid>
                            <Grid item xs='8'>
                                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                                    <h2>{editBooking?.tenTour}</h2>
                                    <p>Khởi hành: <b>{editBooking?.ngayKhoiHanh}</b></p>
                                    <p>Thời gian:<b>{editBooking?.thoiGian}</b> </p>
                                    <p>Nơi khởi hành:<b>{editBooking?.noiKhoiHanh}</b> </p>
                                    <p>Số chỗ còn nhận:<b>{editBooking?.soCho}</b> </p>
                                </div>
                            </Grid>
                        </Grid>
                        <Typography variant="h4" my={1}>Thông tin liên lạc</Typography>
                    </Grid>

                    {/* điền thông tin đăng ký  */}
                    <Grid item xs='12' display='flex'>
                        <Grid item xs='8' >
                            <Grid container spacing={2} my={1} >
                                <Grid item xs="6" >
                                    <EditableTextField label="Họ Và Tên" value={editBooking.nameKH} onSave={handleUpdateNameKH} />
                                </Grid>
                                <Grid item xs="6">
                                    <EditableTextField label="Email" value={editBooking.emailKH} onSave={handleUpdateEmailKH} />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs="6" my={4} >
                                    <EditableTextField label="Phone Number" value={editBooking.phoneNumber} onSave={handleUpdatePhoneNumB} />
                                </Grid>
                                <Grid item xs="6" my={4}>
                                    <EditableTextField label="Địa chỉ" value={editBooking.diaChi} onSave={handleUpdateDicChi} />
                                </Grid>
                            </Grid>

                            {/* số lượng  */}
                            <Typography variant="h4" display="flex" >HÀNH KHÁCH</Typography>
                            <Grid item xs="12" my={5}>
                                <Grid display="flex">
                                    <Grid item xs="6" display="flex">
                                        <Box flexDirection="column" mx={5} >
                                            <Typography variant="h5">Người lớn</Typography>
                                            <Typography variant="h5">lớn hơn 12 tuổi</Typography>
                                        </Box>
                                        <ButtonGroup>
                                            <Button onClick={decreaseAdultCount}>-</Button>
                                            <Button ><b>{editBooking.soChoNL}</b></Button>
                                            <Button onClick={increaseAdultCount}>+</Button>
                                        </ButtonGroup>
                                    </Grid>
                                    <Grid item xs="6">
                                        <Box display="flex">
                                            <Box flexDirection="column" mx={5} >
                                                <Typography variant="h5">Trẻ em</Typography>
                                                <Typography variant="h5">5-11 tuổi</Typography>
                                            </Box>
                                            <ButtonGroup>
                                                <Button onClick={decreaseChildCount}>-</Button>
                                                <Button ><b>{editBooking.soChoTreEm}</b></Button>
                                                <Button onClick={increaseChildCount}>+</Button>
                                            </ButtonGroup>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid display="flex">
                                    <Grid item xs="6" my={4}>
                                        <Box display="flex">
                                            <Box flexDirection="column" mx={8.3} >
                                                <Typography variant="h5">Trẻ nhỏ</Typography>
                                                <Typography variant="h5">từ 2-4 tuổi</Typography>
                                            </Box>
                                            <ButtonGroup>
                                                <Button onClick={decreaseTreNho}>-</Button>
                                                <Button ><b>{editBooking.soChoTreNho}</b></Button>
                                                <Button onClick={increaseTreNho}>+</Button>
                                            </ButtonGroup>
                                        </Box>
                                    </Grid>
                                    <Grid item xs="6" my={4} >
                                        <Box display="flex">
                                            <Box flexDirection="column" mx={3.8} >
                                                <Typography variant="h5">Em bé</Typography>
                                                <Typography variant="h5">từ 0-2 tuổi</Typography>
                                            </Box>
                                            <ButtonGroup>
                                                <Button onClick={decreaseEmbe}>-</Button>
                                                <Button ><b>{editBooking.soChoEmBe}</b></Button>
                                                <Button onClick={increaseEmbe}>+</Button>
                                            </ButtonGroup>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* thông báo độ tuổi  */}
                            <Grid item xs='12'>
                                <Grid display="flex">
                                    <Grid item xs='6'  >
                                        <Typography variant="body1">. Người lớn sinh trước ngày 12/08/2011</Typography>
                                    </Grid>
                                    <Grid item xs='6'  >
                                        <Typography variant="body1">. Trẻ nhỏ sinh từ 13/08/2018 đến 12/08/2021</Typography>
                                    </Grid>
                                </Grid>
                                <Grid display="flex">
                                    <Grid item xs='6'  >
                                        <Typography variant="body1">. Trẻ em sinh từ 13/08/2011 đến 12/08/2018</Typography>
                                    </Grid>
                                    <Grid item xs='6'  >
                                        <Typography variant="body1">. Em bé sinh từ 13/08/2021 đến 14/08/2023</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Thanh toán tóm tắt chuyến đi   */}
                        <Grid item xs="4" pl={5}>
                            <Grid item xs='12'>
                                <h2>Tóm tắt chuyến đi</h2>
                                <img
                                    src={`${srcImg}/${editBooking?.image}`}
                                    style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    alt="Image 1"
                                />
                                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                                    <h2>{editBooking?.tenTour}</h2>
                                </div>
                            </Grid>

                            <Grid display="flex" pl={3}>
                                <Typography variant="h6" >Hành Khách</Typography>
                                <Grid pl={10}>
                                    <Diversity3Icon />
                                </Grid>
                                <Typography variant="body1">{countFull}</Typography>
                            </Grid>

                            <Grid display="flex" pl={3} my={3}>
                                <Typography variant="body1">Người lớn</Typography>
                                <Grid pl={10}>
                                    <Typography variant="body1" >{editBooking?.soChoNL} x {editBooking?.giaTour} đ</Typography>
                                </Grid>
                            </Grid>

                            <Grid my={3} pl={3} display="flex">
                                <Typography variant="body1">Trẻ em</Typography>
                                <Grid pl={13}>
                                    <Typography variant="body1" >{editBooking?.soChoTreEm} x {editBooking?.giaTreEm} đ</Typography>
                                </Grid>
                            </Grid>

                            <Grid my={3} pl={3} display="flex">
                                <Typography variant="body1" >Trẻ nhỏ</Typography>
                                <Grid pl={12.4}>
                                    <Typography variant="body1">{editBooking?.soChoTreNho} x {editBooking?.giaTreNho} đ</Typography>
                                </Grid>
                            </Grid>

                            <Grid my={3} pl={3} display="flex">
                                <Typography variant="body1" >Em bé </Typography>
                                <Grid pl={14.3}>
                                    <Typography variant="body1" >{editBooking?.soChoEmBe} x {editBooking?.giaEmBe} đ</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ margin: '16px 0' }} />

                            <Grid my={3} pl={3} display="flex">
                                <Typography variant="body1" >Tổng cộng </Typography>
                                <Grid pl={13} >
                                    <Typography variant="body1" >{tongGia1} đ </Typography>
                                </Grid>
                            </Grid>

                            <Grid my={5} pl={3} >
                                {editBooking?.soCho !== 0 &&
                                    <Button variant="contained" onClick={() => handleUpdate()}>
                                        Lưu thông tin
                                    </Button>
                                }
                                {editBooking?.soCho == 0 &&
                                    <Link to={"/"} >
                                        <Button variant="contained" type='submit' >
                                            Quay về trang chủ
                                        </Button>
                                    </Link>
                                }
                                <Dialog open={open}>
                                    <DialogTitle>Waiting for Admin Confirmation</DialogTitle>
                                    <DialogContent>
                                        {loading ? <CircularProgress /> : 'Waiting for admin to confirm the update...'}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                                    </DialogActions>
                                </Dialog>
                                <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} message="Update confirmed!" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}
