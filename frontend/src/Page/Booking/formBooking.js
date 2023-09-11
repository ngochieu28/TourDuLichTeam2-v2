import React from 'react'
import tourApi from '../../api/tourApi';
import AvataTour from './AvataTour';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { AppConsumer } from '../../store';
import bookingApi from '../../api/bookingApi'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useParams, Link } from 'react-router-dom';
import {
    Grid, TextField, Box, Typography, Button, ButtonGroup, Divider,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { srcImg } from '../../api/srcImg';

const FormBooking = () => {
    const [state, dispatch] = AppConsumer();
    const [tours, setTours] = useState();


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
    const tongGia1 = giaNguoiLon1 + giaTreEm1 + giaTreNho1 + giaEmBe1

    // validation input
    const validationSchema = yup.object({
        nameKH: yup.string().max(50, "Must be less than 50 characters").required('Họ và tên là bắt buộc'),
        emailKH: yup.string().email('Invalid email address').matches(/@/, 'Email phải chứa ký tự @').required('Địa chỉ là bắt buộc'),
        phoneNumber: yup.string().matches(/^\d{9,11}$/, "Must be between 9 and 11 digits").required('Required'),
        diaChi: yup.string().max(50, "Must be less than 50 characters").required('Địa chỉ là bắt buộc'),
    });

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            tourId: "",
            nameKH: "",
            emailKH: "",
            phoneNumber: "",
            diaChi: "",
            tongGia: "",
        },
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        setValue("tourId", maTour)
        setValue("nameKH", state.data.nameKH)
        setValue("emailKH", state.data.emailKH)
        setValue("phoneNumber", state.data.phoneNumber)
        setValue("diaChi", state.data.diaChi)
        setValue("soChoNl", state.data.soChoNl)
        setValue("soChoTreEM", state.data.soChoTreEM)
        setValue("soChoTreNho", state.data.soChoTreNho)
        setValue("soChoEmBe", state.data.soChoEmBe)
        // setValue("userId", state.userInfo)
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

        const data2 = {
            ...data, soChoNL: count,
            soChoTreEm: childCount,
            soChoTreNho: treNho,
            soChoEmBe: emBe,
            tongGia: tongGia1,
            userId: state.userInfo.userId,
        }

        let res = await bookingApi.creatBooking(data2)

        window.location.href = `/thanhToan/${maTour}/${res}`;
    }

    // button
    const onSubmit = (data) => {
        addNewBooking(data)
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
                    <Grid container display='flex'>
                        <Grid item xs='12' sm={12} md={8} >
                            <Grid container spacing={2} my={1} >
                                <Grid item xs="6" >
                                    <Controller name="nameKH" control={control} render={({ field }) => (
                                        <TextField
                                            {...register('nameKH')}
                                            label="Họ và tên "
                                            {...field}
                                            fullWidth
                                            helperText={errors?.nameKH?.message}
                                            error={!!errors.nameKH}
                                        />
                                    )} />
                                </Grid>
                                <Grid item xs="6">
                                    <Controller name="emailKH" control={control} render={({ field }) => (
                                        <TextField
                                            {...register('emailKH')}
                                            label="Email"
                                            {...field}
                                            fullWidth
                                            helperText={errors?.emailKH?.message}
                                            error={!!errors.emailKH}
                                        />
                                    )} />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs="6" my={4} >
                                    <Controller name="phoneNumber" control={control} render={({ field }) => (
                                        <TextField
                                            {...register('phoneNumber')}
                                            label="Số điện thoại"
                                            {...field}
                                            fullWidth
                                            helperText={errors?.phoneNumber?.message}
                                            error={!!errors.phoneNumber}
                                            type='number'
                                        />
                                    )} />
                                </Grid>
                                <Grid item xs="6" my={4}>
                                    <Controller name="diaChi" control={control} render={({ field }) => (
                                        <TextField
                                            {...register('diaChi')}
                                            label="Địa chỉ"
                                            {...field}
                                            fullWidth
                                            helperText={errors?.diaChi?.message}
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
                                            <Button disabled><b>{count}</b></Button>
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
                                                <Button disabled><b>{childCount}</b></Button>
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
                                                <Button disabled><b>{treNho}</b></Button>
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
                                                <Button disabled><b>{emBe}</b></Button>
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
                        <Grid item xs="12" sm={12} md={4} pl={5}>
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
                                    <Typography variant="body1" >{tongGia1} đ </Typography>
                                </Grid>
                            </Grid>

                            <Grid my={5} pl={3} >
                                {tours?.soCho !== 0 &&
                                    <Button variant="contained" type='submit' >{onSubmit}
                                        Đặt ngay
                                    </Button>
                                }
                                {tours?.soCho == 0 &&
                                    <Link to={"/"} >
                                        <Button variant="contained" type='submit' >
                                            Quay về trang chủ
                                        </Button>
                                    </Link>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </div >
    )
}
export default FormBooking;