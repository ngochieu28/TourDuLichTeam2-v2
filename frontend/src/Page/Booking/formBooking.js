import React from 'react'
import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { AppConsumer } from '../../store';
import bookingApi from '../../api/bookingApi'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useNavigate } from 'react-router-dom';
import {
    Grid, TextField, Box, Typography, Card, CardActionArea, CardMedia, CardContent, Button, ButtonGroup, Divider
} from '@mui/material';

const FormBooking = () => {
    const [state, dispatch] = AppConsumer();
    const navigate = useNavigate();

    const [count, setCount] = useState(1);
    const [childCount, setChildCount] = useState(0)
    const [treNho, setTreNho] = useState(0)
    const [emBe, setEmBe] = useState(0)

    const countFull = count + childCount + treNho + emBe;
    const giaNguoiLon = count * 800000
    const giaTreEm = childCount * 500000
    const giaTreNho = treNho * 350000
    const giaEmBe = emBe * 100000
    const tongGia = giaNguoiLon + giaTreEm + giaTreNho + giaEmBe

    const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            nameKH: "",
            emailKH: "",
            phoneNumber: "",
            diaChi: "",
        },
    });

    useEffect(() => {
        setValue("nameKH", state.data.nameKH)
        setValue("emailKH", state.data.emailKH)
        setValue("phoneNumber", state.data.phoneNumber)
        setValue("diaChi", state.data.diaChi)

    }, [state.data])

    // call Api
    const addNewBooking = async (data) => {
        let res = await bookingApi.creatBooking(data)
            .then((data))
    }

    const onSubmit = (data) => {
        addNewBooking(data)
    }


    //// check tăng giảm
    const increaseAdultCount = () => {
        setCount(count + 1);
    };

    const decreaseAdultCount = () => {
        if (count > 1) {
            setCount(count - 1);
        } else {
            alert("Số lượng không thể nhỏ hơn 1!");
        }
    };

    const increaseChildCount = () => {
        setChildCount(childCount + 1);
    };

    const decreaseChildCount = () => {
        if (childCount > 0) {
            setChildCount(childCount - 1);
        }
    };

    const increaseTreNho = () => {
        setTreNho(treNho + 1);
    };

    const decreaseTreNho = () => {
        if (treNho > 0) {
            setTreNho(treNho - 1);
        }
    };

    const increaseEmbe = () => {
        setEmBe(emBe + 1);
    };

    const decreaseEmbe = () => {
        if (emBe > 0) {
            setEmBe(emBe - 1);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Box pl={25} pr={10}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="#"
                                alt="#"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    tên tour
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Typography variant="h5" display="flex" my={1}>Thông Tin Chuyến Đi</Typography>
                    <Typography variant="h6" display="flex" my={1}>Thông tin liên lạc</Typography>
                    <Box border="1px solid gray" backgroundColor='#eeeeee' >
                        <Grid container spacing={5} my={1} >
                            <Grid item xs={3} >
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
                            <Grid item xs={3}>
                                <Box pl={2} pr={5}>
                                    <Controller name="emailKH" control={control} render={({ field }) => (
                                        <TextField
                                            label="Email"
                                            {...field}
                                            fullWidth
                                            helperText={errors.emailKH && errors.emailKH.message}
                                            error={!!errors.emailKH}
                                        />
                                    )} />
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container spacing={5}>
                            <Grid item xs={3} my={4}>
                                <Box pl={2} pr={5}>
                                    <Controller name="phoneNumber" control={control} render={({ field }) => (
                                        <TextField
                                            label="Số điện thoại"
                                            {...field}
                                            fullWidth
                                            helperText={errors.phoneNumber && errors.phoneNumber.message}
                                            error={!!errors.phoneNumber}
                                        />
                                    )} />
                                </Box>
                            </Grid>
                            <Grid item xs={3} my={4}>
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
                        <Grid container spacing={5} my={1} item xs={8}>
                            <Grid item xs={4}>
                                <Box display="flex">
                                    <Box flexDirection="column" mx={5} >
                                        <Typography variant="body1">Người lớn</Typography>
                                        <Typography variant="body2">lớn hơn 12 tuổi</Typography>
                                    </Box>
                                    <ButtonGroup>
                                        <Button onClick={decreaseAdultCount}>-</Button>
                                        <Button disabled>{count}</Button>
                                        <Button onClick={increaseAdultCount}>+</Button>
                                    </ButtonGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
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

                        <Grid container spacing={5} item xs={8}>
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
                    <Grid container spacing={5} my={1}>
                        <Grid item xs={8} my={2} >
                            <Box display="flex">
                                <Box flexDirection="column" mx={4.5} >
                                    <Typography variant="body1">. Người lớn sinh trước ngày 12/08/2011</Typography>
                                    <Typography variant="body1">. Trẻ nhỏ sinh từ 13/08/2018 đến 12/08/2021</Typography>
                                </Box>
                                <Box flexDirection="column" mx={4.5} >
                                    <Typography variant="body1">. Trẻ em sinh từ 13/08/2011 đến 12/08/2018</Typography>
                                    <Typography variant="body1">. Em bé sinh từ 13/08/2021 đến 14/08/2023</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {/* Thanh toán tóm tắt chuyến đi   */}
                <Box pl={25} pr={10} my={5} >
                    <Grid container spacing={5} my={1} >
                        <Typography variant="h6">Tóm tắt chuyến đi</Typography>
                    </Grid>
                    <Grid container spacing={5} my={1} display="flex" >
                        <Typography variant="h6" mx={20}>Hành Khách</Typography>
                        <Diversity3Icon />
                        <Typography variant="body1">{countFull}</Typography>
                    </Grid>
                    <Grid container spacing={5} my={2} display="flex" >
                        <Typography variant="body1" mx={20}>Người lớn</Typography>
                        <Typography variant="body1">{count} x 800.000 đ</Typography>
                    </Grid>
                    <Grid container spacing={5} my={2} display="flex" >
                        <Typography variant="body1" mx={20}>Trẻ em</Typography>
                        <Typography variant="body1">{childCount} x 500.000 đ</Typography>
                    </Grid>
                    <Grid container spacing={5} my={2} display="flex" >
                        <Typography variant="body1" mx={20}>Trẻ nhỏ</Typography>
                        <Typography variant="body1">{treNho} x 350.000 đ</Typography>
                    </Grid>
                    <Grid container spacing={5} my={2} display="flex" >
                        <Typography variant="body1" mx={20}>Em bé </Typography>
                        <Typography variant="body1">{emBe} x 100.000 đ</Typography>
                    </Grid>
                    <Divider sx={{ margin: '16px 0' }} />
                    <Grid container spacing={5} my={2} display="flex" >
                        <Typography variant="body1" mx={20}>Tổng cộng </Typography>
                        <Typography variant="body1">{tongGia} đ </Typography>
                    </Grid>
                    <Button variant="contained" type='submit'>{onSubmit} Đặt ngay</Button>
                </Box>

            </form>
        </div>
    )
}
export default FormBooking;