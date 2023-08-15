import React from 'react'
import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { AppConsumer } from '../../store';
import bookingApi from '../../api/bookingApi'
import {
    Grid, TextField, Box, Typography, Card, CardActionArea, CardMedia, CardContent, Button, ButtonGroup
} from '@mui/material';
import LeftMenu from '../../conponents/LeftMenu';


const FormBooking = ({ setIsGetBooking }) => {
    const [state, dispatch] = AppConsumer();

    const [count, setCount] = useState(1);
    const [childCount, setChildCount] = useState(0)
    const [treNho, setTreNho] = useState(0)
    const [emBe, setEmBe] = useState(0)

    const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            nameKH: "",
            emailKH: "",
            phoneNumber: "",
            diaChi: "",
            dateOfBirth: "",
        },
    });

    useEffect(() => {
        setValue("nameKH", state.data.nameKH)
        setValue("emailKH", state.data.emailKH)
        setValue("phoneNumber", state.data.phoneNumber)
        setValue("diaChi", state.data.diaChi)
        setValue("dateOfBirth", state.data.dateOfBirth)

    }, [state.data])

    const addNewBooking = async (data) => {
        let res = await bookingApi.creatBooking(data)
            .then(setIsGetBooking(data));

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
        if (count > 0) {
            setChildCount(childCount - 1);
        }
    };

    const increaseTreNho = () => {
        setTreNho(treNho + 1);
    };

    const decreaseTreNho = () => {
        if (count > 0) {
            setTreNho(treNho - 1);
        }
    };

    const increaseEmbe = () => {
        setEmBe(emBe + 1);
    };

    const decreaseEmbe = () => {
        if (count > 0) {
            setEmBe(emBe - 1);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Box border="1px solid gray" backgroundColor='#eeeeee' item xs={6}>
                        <Grid container spacing={5} my={1} >
                            <Grid item xs={3} >
                                <Box pl={2} pr={5} >
                                    <Controller name="nameKH" control={control} render={({ field }) => (
                                        <TextField label="Họ và tên " fullWidth />
                                    )} />
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box pl={2} pr={5}>
                                    <Controller name="emailKH" control={control} render={({ field }) => (
                                        <TextField label="Email" fullWidth />
                                    )} />
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container spacing={5}>
                            <Grid item xs={3} my={4}>
                                <Box pl={2} pr={5}>
                                    <Controller name="phoneNumber" control={control} render={({ field }) => (
                                        <TextField label="Số điện thoại" fullWidth />
                                    )} />
                                </Box>
                            </Grid>
                            <Grid item xs={3} my={4}>
                                <Box pl={2} pr={5}>
                                    <Controller name="diaChi" control={control} render={({ field }) => (
                                        <TextField label="Địa chỉ" fullWidth />
                                    )} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Box pl={25} pr={10}>
                    <Typography variant="h6" display="flex" >HÀNH KHÁCH</Typography>
                    <Grid container spacing={5} my={1}>
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

                    <Grid container spacing={5}>
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
            </form>
        </div>
    )
}
export default FormBooking;