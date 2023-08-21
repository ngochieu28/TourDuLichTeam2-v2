import React from 'react'
import Header1 from '../../conponents/Navbar'
import tourApi from '../../api/tourApi';
import Footer from '../../conponents/Footer';
import AvataTour from './AvataTour';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { AppConsumer } from '../../store';
import bookingApi from '../../api/bookingApi'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useParams, useNavigate } from 'react-router-dom';
import { srcImg } from '../../util/srcImg';
import {
    Grid, TextField, Box, Typography,
    Button, ButtonGroup, Divider,
} from '@mui/material';

const FormBooking = () => {
    const [state, dispatch] = AppConsumer();
    const [tours, setTours] = useState();

    const [count, setCount] = useState(1);
    const [childCount, setChildCount] = useState(0)
    const [treNho, setTreNho] = useState(0)
    const [emBe, setEmBe] = useState(0)

    const giaNguoiLon = (tours?.giaTour);
    const giaTreEm = (tours?.giaTreEm);
    const giaTreNho = (tours?.giaTreNho);
    const giaEmBe = (tours?.giaEmBe);
    const soCho = (tours?.soCho);

    const countFull = count + childCount + treNho + emBe;

    const giaNguoiLon1 = count * giaNguoiLon
    const giaTreEm1 = childCount * giaTreEm
    const giaTreNho1 = treNho * giaTreNho
    const giaEmBe1 = emBe * giaEmBe
    const tongGia = giaNguoiLon1 + giaTreEm1 + giaTreNho1 + giaEmBe1

    const navigate = useNavigate();

    const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            tourId: "",
            nameKH: "",
            emailKH: "",
            phoneNumber: "",
            diaChi: "",
        },
    });

    useEffect(() => {
        setValue("tourId", maTour)
        setValue("nameKH", state.data.nameKH)
        setValue("emailKH", state.data.emailKH)
        setValue("phoneNumber", state.data.phoneNumber)
        setValue("diaChi", state.data.diaChi)

    }, [state.data])

    // avatar Tour
    const { maTour } = useParams();

    const getTourDetail2 = async () => {
        const res = await tourApi.getTourDetailByMaTour(maTour);
        setTours(res);
    };

    useEffect(() => {
        getTourDetail2()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maTour]);

    // call Api
    const addNewBooking = async (data) => {
        let res = await bookingApi.creatBooking(data)
            .then((data))
    }

    // button
    const onSubmit = (data) => {
        addNewBooking(data)
        navigate(`/thanhToan/${maTour}`)
    }

    //// check tăng giảm
    const increaseAdultCount = () => {
        if (countFull == tours?.soCho) {
            alert("Số chỗ còn lại là" + tours?.soCho)
        } else {
            setCount(count + 1);
        }
    };

    const decreaseAdultCount = () => {
        if (count > 1) {
            setCount(count - 1);
        } else {
            alert("Số lượng không thể nhỏ hơn 1!");
        }
    };

    const increaseChildCount = () => {
        if (countFull == tours?.soCho) {
            alert("Số chỗ còn lại là" + tours?.soCho)
        } else {
            setChildCount(childCount + 1);
        }
    };

    const decreaseChildCount = () => {
        if (childCount > 0) {
            setChildCount(childCount - 1);
        }
    };

    const increaseTreNho = () => {
        if (countFull == tours?.soCho) {
            alert("Số chỗ còn lại là" + tours?.soCho)
        } else {
            setTreNho(treNho + 1);
        }
    };

    const decreaseTreNho = () => {
        if (treNho > 0) {
            setTreNho(treNho - 1);
        }
    };

    const increaseEmbe = () => {
        if (countFull == tours?.soCho) {
            alert("Số chỗ còn lại là" + tours?.soCho)
        } else {
            setEmBe(emBe + 1);
        }
    };

    const decreaseEmbe = () => {
        if (emBe > 0) {
            setEmBe(emBe - 1);
        }
    };

    return (
        <div>
            <Header1 />
            <form onSubmit={handleSubmit(onSubmit)} >
                <Box pl={25} pr={10}>
                    <Typography variant="h3" display="flex" my={1}>Thông Tin Chuyến Đi</Typography>
                    <AvataTour />
                    <Typography variant="h6" display="flex" my={1}>Thông tin liên lạc</Typography>
                    <Box border="1px solid gray" backgroundColor='#eeeeee' >
                        <Grid container spacing={5} my={1} >
                            <Grid item xs={4} >
                                <Box pl={2} pr={5} >
                                    <Controller name="nameKH" control={control} render={({ field }) => (
                                        <TextField
                                            label="Họ và tên "
                                            {...field}
                                            fullWidth
                                            helperText={errors.nameKH && errors.nameKH.message}
                                            error={!!errors.nameKH}
                                        />
                                    )} />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box pl={2} pr={5}>
                                    <Controller name="emailKH" control={control} render={({ field }) => (
                                        <TextField
                                            label="Email"
                                            {...field}
                                            fullWidth
                                            helperText={errors.emailKH && errors.emailKH.message}
                                            error={!!errors.emailKH}
                                            type='email'
                                        />
                                    )} />
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container spacing={5}>
                            <Grid item xs={4} my={4}>
                                <Box pl={2} pr={5}>
                                    <Controller name="phoneNumber" control={control} render={({ field }) => (
                                        <TextField
                                            label="Số điện thoại"
                                            {...field}
                                            fullWidth
                                            helperText={errors.phoneNumber && errors.phoneNumber.message}
                                            error={!!errors.phoneNumber}
                                            type='number'
                                        />
                                    )} />
                                </Box>
                            </Grid>
                            <Grid item xs={4} my={4}>
                                <Box pl={2} pr={5}>
                                    <Controller name="diaChi" control={control} render={({ field }) => (
                                        <TextField
                                            label="Địa chỉ"
                                            {...field}
                                            fullWidth
                                            helperText={errors.diaChi && errors.diaChi.message}
                                            error={!!errors.diaChi}
                                        />
                                    )} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Box pl={25} pr={10} my={5}>
                    <Typography variant="h6" display="flex" >HÀNH KHÁCH</Typography>
                    <Box border="1px solid gray" backgroundColor='#eeeeee'>
                        <Grid container spacing={5} my={1} item xs={12}>
                            <Grid item xs="4" display="flex">
                                <Box flexDirection="column" mx={5} >
                                    <Typography variant="body1">Người lớn</Typography>
                                    <Typography variant="body2">lớn hơn 12 tuổi</Typography>
                                </Box>
                                <ButtonGroup>
                                    <Button onClick={decreaseAdultCount}>-</Button>
                                    <Button disabled>{count}</Button>
                                    <Button onClick={increaseAdultCount}>+</Button>
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs="4">
                                <Box display="flex">
                                    <Box flexDirection="column" mx={5} >
                                        <Typography variant="body1">Trẻ em</Typography>
                                        <Typography variant="body2">5-11 tuổi</Typography>
                                    </Box>
                                    <ButtonGroup>
                                        <Button onClick={decreaseChildCount}>-</Button>
                                        <Button disabled>{childCount}</Button>
                                        <Button onClick={increaseChildCount}>+</Button>
                                    </ButtonGroup>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container spacing={5} item xs={12}>
                            <Grid item xs={4} my={4}>
                                <Box display="flex">
                                    <Box flexDirection="column" mx={7} >
                                        <Typography variant="body1">Trẻ nhỏ</Typography>
                                        <Typography variant="body2">từ 2-4 tuổi</Typography>
                                    </Box>
                                    <ButtonGroup>
                                        <Button onClick={decreaseTreNho}>-</Button>
                                        <Button disabled>{treNho}</Button>
                                        <Button onClick={increaseTreNho}>+</Button>
                                    </ButtonGroup>

                                </Box>
                            </Grid>
                            <Grid item xs={4} my={4} >
                                <Box display="flex">
                                    <Box flexDirection="column" mx={4.5} >
                                        <Typography variant="body1">Em bé</Typography>
                                        <Typography variant="body2">từ 0-2 tuổi</Typography>
                                    </Box>
                                    <ButtonGroup>
                                        <Button onClick={decreaseEmbe}>-</Button>
                                        <Button disabled>{emBe}</Button>
                                        <Button onClick={increaseEmbe}>+</Button>
                                    </ButtonGroup>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Box pl={25} pr={10} my={5}>
                    <Grid container spacing={5} my={1} display="flex">
                        <Grid item xs='6'  >
                            <Typography variant="body1">. Người lớn sinh trước ngày 12/08/2011</Typography>
                        </Grid>
                        <Grid item xs='6'  >
                            <Typography variant="body1">. Trẻ nhỏ sinh từ 13/08/2018 đến 12/08/2021</Typography>
                        </Grid>
                        <Grid item xs='6'  >
                            <Typography variant="body1">. Trẻ em sinh từ 13/08/2011 đến 12/08/2018</Typography>
                        </Grid>
                        <Grid item xs='6'  >
                            <Typography variant="body1">. Em bé sinh từ 13/08/2021 đến 14/08/2023</Typography>
                        </Grid>
                    </Grid>
                </Box>
                {/* Thanh toán tóm tắt chuyến đi   */}
                <Grid item xs={2} pl={25} pr={10} my={5}>
                    <h2>Tóm tắt chuyến đi</h2>
                    <img
                        src={`${srcImg}/${tours?.image}`}
                        style={{ height: '50%', width: '50%', objectFit: 'cover', borderRadius: '10px' }}
                        alt="Image 1"
                    />
                    <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                        <h2>{tours?.tenTour}</h2>
                    </div>
                </Grid>

                <Box pl={25} pr={10} my={5} >
                    <Grid container spacing={5} my={1} display="flex" >
                        <Grid >
                            <Typography variant="h6" mx={20}>Hành Khách</Typography>
                        </Grid>
                        <Diversity3Icon />
                        <Typography variant="body1">{countFull}</Typography>
                    </Grid>

                    <Grid container spacing={5} my={1} display="flex">
                        <Grid>
                            <Typography variant="body1" mx={20}>Người lớn</Typography>
                        </Grid>
                        <Typography variant="body1" mx={1}>{count} x {tours?.giaTour} đ</Typography>
                    </Grid>

                    <Grid container spacing={5} my={1} display="flex">
                        <Grid >
                            <Typography variant="body1" mx={20}>Trẻ em</Typography>
                        </Grid>
                        <Typography variant="body1" mx={4}>{childCount} x {tours?.giaTreEm} đ</Typography>
                    </Grid>

                    <Grid container spacing={5} my={1} display="flex">
                        <Grid  >
                            <Typography variant="body1" mx={20}>Trẻ nhỏ</Typography>
                        </Grid>
                        <Typography variant="body1" mx={3.3}>{treNho} x {tours?.giaTreNho} đ</Typography>
                    </Grid>

                    <Grid container spacing={5} my={1} display="flex">
                        <Grid  >
                            <Typography variant="body1" mx={20}>Em bé </Typography>
                        </Grid>
                        <Typography variant="body1" mx={4.4}>{emBe} x {tours?.giaEmBe} đ</Typography>
                    </Grid>
                    <Divider sx={{ margin: '16px 0' }} />

                    <Grid container spacing={5} my={1} display="flex">
                        <Grid  >
                            <Typography variant="body1" mx={20}>Tổng cộng </Typography>
                        </Grid>
                        <Typography variant="body1" mx={3.3}>{tongGia} đ </Typography>
                    </Grid>
                    <Grid spacing={5} my={5} mx={30}>
                        <Button variant="contained" type='submit' >{onSubmit}
                            Đặt ngay
                        </Button>
                    </Grid>
                </Box>
            </form>
            <Footer />
        </div >
    )
}
export default FormBooking;