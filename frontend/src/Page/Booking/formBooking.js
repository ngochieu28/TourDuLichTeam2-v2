import React from 'react'
import tourApi from '../../api/tourApi';
import AvataTour from './AvataTour';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { AppConsumer } from '../../store';
import bookingApi from '../../api/bookingApi'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useParams, useNavigate, } from 'react-router-dom';
import { srcImg } from '../../util/srcImg';
import {
    Grid, TextField, Box, Typography,
    Button, ButtonGroup, Divider,
} from '@mui/material';

const FormBooking = () => {
    const [state, dispatch] = AppConsumer();
    const [tours, setTours] = useState();

    // lấy id 
    const [maBooking, setmaBooking] = useState();

    // đếm Sl và tính giá tiền
    const [count, setCount] = useState(1);
    const [childCount, setChildCount] = useState(0)
    const [treNho, setTreNho] = useState(0)
    const [emBe, setEmBe] = useState(0)

    const giaNguoiLon = (tours?.giaTour);
    const giaTreEm = (tours?.giaTreEm);
    const giaTreNho = (tours?.giaTreNho);
    const giaEmBe = (tours?.giaEmBe);

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
        console.log(res);
        setmaBooking(res)
    }

    // button
    const onSubmit = (data) => {
        addNewBooking(data)
        navigate(`/thanhToan/${maTour}/${maBooking}`)
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
            <Grid container >
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Grid item xs='12'>
                        <Typography variant="h3" my={1}>Thông Tin Chuyến Đi</Typography>
                        <AvataTour />
                        <Typography variant="h4" my={1}>Thông tin liên lạc</Typography>
                    </Grid>

                    {/* điền thông tin đăng ký  */}
                    <Grid item xs='12' display='flex'>
                        <Grid item xs='8' >
                            <Grid container spacing={2} my={1} >
                                <Grid item xs="6" >
                                    <Controller name="nameKH" control={control} render={({ field }) => (
                                        <TextField
                                            label="Họ và tên "
                                            {...field}
                                            fullWidth
                                            helperText={errors.nameKH && errors.nameKH.message}
                                            error={!!errors.nameKH}
                                        />
                                    )} />
                                </Grid>
                                <Grid item xs="6">
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
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs="6" my={4} >
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
                                </Grid>
                                <Grid item xs="6" my={4}>
                                    <Controller name="diaChi" control={control} render={({ field }) => (
                                        <TextField
                                            label="Địa chỉ"
                                            {...field}
                                            fullWidth
                                            helperText={errors.diaChi && errors.diaChi.message}
                                            error={!!errors.diaChi}
                                        />
                                    )} />
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
                                            <Button disabled>{count}</Button>
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
                                                <Button disabled>{childCount}</Button>
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
                                                <Button disabled>{treNho}</Button>
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
                                                <Button disabled>{emBe}</Button>
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
                                    src={`${srcImg}/${tours?.image}`}
                                    style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    alt="Image 1"
                                />
                                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                                    <h2>{tours?.tenTour}</h2>
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
                                    <Typography variant="body1" >{count} x {tours?.giaTour} đ</Typography>
                                </Grid>
                            </Grid>

                            <Grid my={3} pl={3} display="flex">
                                <Typography variant="body1">Trẻ em</Typography>
                                <Grid pl={13}>
                                    <Typography variant="body1" >{childCount} x {tours?.giaTreEm} đ</Typography>
                                </Grid>
                            </Grid>

                            <Grid my={3} pl={3} display="flex">
                                <Typography variant="body1" >Trẻ nhỏ</Typography>
                                <Grid pl={12.4}>
                                    <Typography variant="body1">{treNho} x {tours?.giaTreNho} đ</Typography>
                                </Grid>
                            </Grid>

                            <Grid my={3} pl={3} display="flex">
                                <Typography variant="body1" >Em bé </Typography>
                                <Grid pl={14.3}>
                                    <Typography variant="body1" >{emBe} x {tours?.giaEmBe} đ</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ margin: '16px 0' }} />

                            <Grid my={3} pl={3} display="flex">
                                <Typography variant="body1" >Tổng cộng </Typography>
                                <Grid pl={13} >
                                    <Typography variant="body1" >{tongGia} đ </Typography>
                                </Grid>
                            </Grid>

                            <Grid my={5} pl={3}>
                                <Button variant="contained" type='submit' >{onSubmit}
                                    Đặt ngay
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </div >
    )
}
export default FormBooking;