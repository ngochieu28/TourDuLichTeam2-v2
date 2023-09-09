import React, { useState } from 'react';
import {
    Box, Grid, Typography, Tab, Tabs, InputBase, Button,
    Container, Divider, Drawer, FormGroup, CardContent, Card,
    Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { AppConsumer } from '../store';
import { SET_SEARCHDIEMDEN, SET_SEARCHNOIKHOIHANH, SET_SEARCHTHOIGIAN } from '../store/action'
import { RestartAlt, Search } from '@mui/icons-material';
import bookingApi from '../api/bookingApi';
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';


export default function ResponsiveTabs() {
    const [state, dispatch] = AppConsumer();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [noiKhoiHanh, setNoiKhoiHanh] = React.useState('');
    const [diemDen, setDiemDen] = React.useState('');
    const [thoiGian, setThoiGian] = React.useState('');

    const CustomTabPanel = ({ value, index, children }) => {
        return (
            <div role="tabpanel" hidden={value !== index}>
                {value === index && <Box p={3}>{children}</Box>}
            </div>
        );
    };

    const initialValues = {
        noiKhoiHanh: '',
        diemDen: '',
        thoiGian: '',
    };

    const validationSchema = Yup.object({
        noiKhoiHanh: Yup.string(),
        diemDen: Yup.string(),
        thoiGian: Yup.string(),
    });

    const handleSubmit = (values) => {
        // console.log(values);
        dispatch(SET_SEARCHNOIKHOIHANH(values.noiKhoiHanh))
        dispatch(SET_SEARCHDIEMDEN(values.diemDen))
        dispatch(SET_SEARCHTHOIGIAN(values.thoiGian))
    };

    // Search Booking 
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [booking, setbooking] = useState();
    const [bookingName, setbookingName] = useState();
    const [searchValue, setSearchValue] = useState('');


    const handleInput = (e) => {
        e.preventDefault();
        if (searchValue) {
            if (/^\d+$/.test(searchValue)) {
                getBookingById(searchValue)
            } else {
                getBookingByNameKH(searchValue)
            }
        }
    };


    const getBookingById = async (maBooking) => {
        // const maBooking = selectedId
        let res = await bookingApi.getBookingById(maBooking)
        setbooking(res);

        // Open button update
        setShowUpdateButton(true)
    };

    const getBookingByNameKH = async (nameKH) => {
        // const nameKH = selectedName
        let res = await bookingApi.getBookingByNameKH(nameKH)
        setbookingName(res)

        // Open button update
        setShowUpdateButton(true)
    }

    const navigate = useNavigate()

    const updateBooking = () => {
        navigate(`/updateBooking/${booking?.maBooking}`)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="responsive tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Tour du lịch trọn gói" />
                    <Tab label="Khách sạn" />
                    <Tab label="Vé máy bay" />
                    <Tab label="Combo vé máy bay + Khách sạn" />
                    <Tab label="Combo xe + khách sạn" />
                    <Tab label="Tra cứu Booking" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                                <Box inline className="ml-auto position-relative">
                                    <div className="position-relative" style={{ display: 'inline-block' }}>
                                        <FormGroup>
                                            <Field
                                                label="Điểm đi...."
                                                type="text"
                                                name="noiKhoiHanh"
                                                component={TextField}
                                                fullWidth
                                            />
                                        </FormGroup>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box inline className="ml-auto position-relative">
                                    <div className="position-relative" style={{ display: 'inline-block' }}>
                                        <FormGroup>
                                            <Field
                                                label="Điểm đến...."
                                                type="text"
                                                name="diemDen"
                                                component={TextField}
                                                fullWidth
                                            />
                                        </FormGroup>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box inline className="ml-auto position-relative">
                                    <div className="position-relative" style={{ display: 'inline-block' }}>
                                        <FormGroup>
                                            <Field
                                                label="Số ngày...."
                                                type="text"
                                                name="thoiGian"
                                                component={TextField}
                                                fullWidth
                                            />
                                        </FormGroup>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Button
                                            type="submit"
                                            style={{
                                                background: 'linear-gradient(64.4deg, #244c7a 21.33%, #002f65 67.61%)',
                                                color: '#fff',
                                                padding: '8px 16px',
                                                border: 'none',
                                                borderRadius: '4px',
                                                color: 'yellow',
                                                height: '50px',
                                            }}
                                        >
                                            <Search />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            style={{
                                                background: 'linear-gradient(64.4deg, #244c7a 21.33%, #002f65 67.61%)',
                                                color: '#fff',
                                                padding: '8px 16px',
                                                border: 'none',
                                                borderRadius: '4px',
                                                color: 'yellow',
                                                height: '50px',
                                            }}
                                            onClick={() => {
                                                dispatch(SET_SEARCHNOIKHOIHANH(''))
                                                dispatch(SET_SEARCHDIEMDEN(''))
                                                dispatch(SET_SEARCHTHOIGIAN(''))
                                            }}
                                        >
                                            <RestartAlt />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <h4>Có điều kiện sẽ phát triển sau</h4>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <h4>Có điều kiện sẽ phát triển sau</h4>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <h4>Có điều kiện sẽ phát triển sau</h4>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <h4>Có điều kiện sẽ phát triển sau</h4>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <Container >
                    <Grid container >
                        <Grid item xs="6" display="flex">
                            <Typography variant="h5" component="h2">
                                <InputBase value={searchValue} placeholder='Nhập thông tin tìm kiếm:' onChange={(e) => setSearchValue(e.target.value)} />
                            </Typography>
                        </Grid>
                        <Grid item xs="6" >
                            <Button onClick={handleInput}> Tìm kiếm</Button>
                        </Grid>
                    </Grid>
                    <Divider />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên người đặt</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Số điện thoại</TableCell>
                                    <TableCell>Địa chỉ</TableCell>
                                    <TableCell>Số lượng người lớn</TableCell>
                                    <TableCell>Số lượng trẻ em</TableCell>
                                    <TableCell>Số lượng trẻ nhỏ</TableCell>
                                    <TableCell>Số lượng em bé</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align='center'><b>{booking?.nameKH}</b></TableCell>
                                    <TableCell align='center'><b>{booking?.emailKH}</b></TableCell>
                                    <TableCell align='center'><b>{booking?.phoneNumber}</b></TableCell>
                                    <TableCell align='center'><b>{booking?.diaChi}</b></TableCell>
                                    <TableCell align='center'><b>{booking?.soChoNL}</b></TableCell>
                                    <TableCell align='center'><b>{booking?.soChoTreEm}</b></TableCell>
                                    <TableCell align='center'><b>{booking?.soChoTreNho}</b></TableCell>
                                    <TableCell align='center'><b>{booking?.soChoEmBe}</b></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'><b>{bookingName?.nameKH}</b></TableCell>
                                    <TableCell align='center'><b>{bookingName?.emailKH}</b></TableCell>
                                    <TableCell align='center'><b>{bookingName?.phoneNumber}</b></TableCell>
                                    <TableCell align='center'><b>{bookingName?.diaChi}</b></TableCell>
                                    <TableCell align='center'><b>{bookingName?.soChoNL}</b></TableCell>
                                    <TableCell align='center'><b>{bookingName?.soChoTreEm}</b></TableCell>
                                    <TableCell align='center'><b>{bookingName?.soChoTreNho}</b></TableCell>
                                    <TableCell align='center'><b>{bookingName?.soChoEmBe}</b></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </CustomTabPanel>
        </Box>
    );
}