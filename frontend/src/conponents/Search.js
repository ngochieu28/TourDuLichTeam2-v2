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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';

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
    const [booking, setBooking] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getBookingByUserId = async () => {
        if (isFetching) {
            // Nếu đang gọi API, không thực hiện lại
            return;
        }
        try {
            setIsFetching(true);
            let res = await bookingApi.getBookingByUserId(state.userInfo.userId);
            setBooking(res);
        } catch (error) {
            // Xử lý lỗi khi gọi API
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (state.userInfo.userId) {
            getBookingByUserId();
        }
    }, [state.userInfo.userId]);

    const navigate = useNavigate()
    const updateBooking = (maBooking) => {
        navigate(`/updateBooking/${maBooking}`)
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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên người đặt</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Số điện thoại</TableCell>
                                <TableCell>Tổng lượng khách</TableCell>
                                <TableCell>Thời gian đặt</TableCell>
                                <TableCell>Nơi khởi hành</TableCell>
                                <TableCell>Ngày khởi hành</TableCell>
                                <TableCell>Tổng giá </TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {booking.map((item) => (
                                <TableRow key={item.userId}>
                                    <TableCell align='center' scope="row"><b>{item.nameKH}</b></TableCell>
                                    <TableCell align='center'><b>{item.emailKH}</b></TableCell>
                                    <TableCell align='center'><b>{item.phoneNumber}</b></TableCell>
                                    <TableCell align='center'><b>{item.soNguoiThamGia}</b></TableCell>
                                    <TableCell align='center'><b>{item.thoiGianDat}</b></TableCell>
                                    <TableCell align='center'><b>{item.noiKhoiHanh}</b></TableCell>
                                    <TableCell align='center'><b>{item.ngayKhoiHanh}</b></TableCell>
                                    <TableCell align='center'><b>{item.tongGia}</b></TableCell>
                                    <TableCell align='center'><b>{item.trangThai}</b></TableCell>
                                    <TableCell><Button startIcon={<EditIcon />} onClick={() => updateBooking(item.maBooking)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
            </CustomTabPanel>
        </Box>
    );
}