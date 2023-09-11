import React, { useState, useEffect } from 'react'
import Header2 from '../../conponents/Navbar'
import Footer from '../../conponents/Footer'
import tourApi from '../../api/tourApi';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Grid, Box, Typography, TextField, Radio, RadioGroup, FormControlLabel,
    Divider, Button, Alert, Stack, Snackbar
} from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import bookingApi from '../../api/bookingApi';
import { Container } from '@mui/system';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import { srcImg } from '../../api/srcImg';

export default function ThanhToan() {

    const [selectedMethod, setSelectedMethod] = useState('');
    const [tours, setTours] = useState();
    const [booking, setBooking] = useState()

    const giaNguoiLon1 = (booking?.soChoNL) * (tours?.giaTour)
    const giaTreEm1 = (booking?.soChoTreEm) * (tours?.giaTreEm)
    const giaTreNho1 = (booking?.soChoTreNho) * (tours?.giaTreNho)
    const giaEmBe1 = (booking?.soChoEmBe) * (tours?.giaEmBe)
    const tongGia = giaNguoiLon1 + giaTreEm1 + giaTreNho1 + giaEmBe1

    const countFull = (booking?.soChoNL) + (booking?.soChoTreEm) + (booking?.soChoTreNho) + (booking?.soChoEmBe);

    // api booking
    const { maBooking } = useParams();
    const getBooking = async () => {
        const res = await bookingApi.getBookingById(maBooking)
        setBooking(res);
    };

    useEffect(() => {
        getBooking()
    }, [maBooking]);

    // avatar Tour
    const { maTour } = useParams();

    const getTourDetail2 = async () => {
        const res = await tourApi.getTourDetailByMaTour(maTour);
        setTours(res);
    };

    useEffect(() => {
        getTourDetail2()
    }, [maTour]);

    // modal show id khi thành công
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // update số chỗ tour sau khi đặt
    const navigate = useNavigate()

    const updateSochoTour = async (e) => {
        e.preventDefault();
        const data = { "soChoDaDat": countFull }
        const res = await tourApi.updateSoChoTour(maTour, data)
        toast.success('Đặt thành công!');
    }

    const handleClick = (countFull) => {
        updateSochoTour(countFull)
        handleOpen();
    };

    const goHome = () => {
        navigate("/")
    }

    // check chọn nút thanh toán 
    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    const renderPaymentInfo = () => {
        if (selectedMethod === 'cash') {
            return <Box
                border="1px solid #ccc"
                borderRadius={4}
                padding={2}
                width={300}
            >
                <Typography variant="h6" gutterBottom>
                    Thanh toán chuyển kho
                </Typography>
                <Typography variant="body1" gutterBottom>Quý khách vui lòng thanh toán tại bất kỳ văn phòng Vietravel trên toàn quốc và các chi nhánh tại nước ngoài. Xem chi tiết. </Typography>
            </Box>;
        } else if (selectedMethod === 'bankTransfer') {
            return <Box
                border="1px solid #ccc"
                borderRadius={4}
                padding={2}
                width={300}
            >
                <Typography variant="h6" gutterBottom>
                    Thanh toán tiền mặt
                </Typography>
                <Typography variant="body1" gutterBottom> Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi email đến contactcenter@vietravel.com hoặc gọi tổng đài 19001839 để được xác nhận từ công ty chúng tôi.</Typography>
                <Typography variant="body1" gutterBottom> Tên Tài Khoản : Công ty CP Du lịch và Tiếp thị GTVT Việt Nam – Vietravel</Typography>
                <Typography variant="body1" gutterBottom> Tên tài khoản viết tắt : VIETRAVEL</Typography>
                <Typography variant="body1" gutterBottom> Số Tài khoản : <b>111 6977 27979</b>  </Typography>
                <Typography variant="body1" gutterBottom> Ngân hàng : Vietinbank - Chi nhánh 7</Typography>
            </Box>;
        } else if (selectedMethod === 'vnpay') {
            return <Box
                border="1px solid #ccc"
                borderRadius={4}
                padding={2}
                width={300}
            >
                <Typography variant="h6" gutterBottom>
                    Thanh toán Vnpay
                </Typography>
                <TextField
                    label="Số thẻ tín dụng"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Ngày hết hạn"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Mã CVV"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
            </Box>;
        }
        return;
    };

    return (
        <div>
            <Header2 />

            <Box display="flex" spacing={5} my={1} item xs={8} pl={30} pr={10}>
                <Box flexDirection="column" mx={5} >
                    <h3>1. Nhập thông tin </h3>
                </Box>
                <h3>2. Thanh toán </h3>
            </Box>
            <hr />
            <Container>
                <Box display="flex" >
                    <Grid container spacing={3}>
                        <Grid item xs='12' sm={12} md={6}>
                            <Box spacing={5} item xs={8} >
                                <Typography variant="h5" my={3}>Thanh toán</Typography>
                                <Typography variant="h6" my={3}>Các hình thức thanh toán</Typography>

                                <Box border="1px solid #ccc" borderRadius={4} padding={2}>

                                    <RadioGroup name="paymentMethod" value={selectedMethod} onChange={handleMethodChange}>
                                        <Box display="flex">
                                            <FormControlLabel value="cash" control={<Radio />} label="Tiền mặt" />
                                            <FormControlLabel value="bankTransfer" control={<Radio />} label="Chuyển khoản" />
                                            <FormControlLabel value="vnpay" control={<Radio />} label="VNPay" />
                                        </Box>
                                    </RadioGroup>

                                    {renderPaymentInfo()}

                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs='12' sm={12} md={6}>
                            <Box
                                border="1px solid #ccc"
                                borderRadius={4}
                                padding={2}
                            >
                                <Grid >
                                    <h2>Tóm tắt chuyến đi</h2>
                                    <img
                                        src={`${srcImg}/${tours?.image}`}
                                        style={{ height: '50%', width: '50%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 1"
                                    />
                                    <img
                                        src={`${srcImg}/${tours?.image}`}
                                        style={{ height: '50%', width: '50%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 3"
                                    />
                                    <div style={{ backgroundColor: 'white', borderRadius: '10px', }}>
                                        <h3>{tours?.tenTour}</h3>
                                    </div>
                                </Grid>

                                <Grid container spacing={5} my={1} display="flex" >
                                    <Grid mx={20}>
                                        <Typography variant="body1" mx={1}>Họ và tên: {booking?.nameKH} </Typography>
                                        <Typography variant="body1" mx={1}>email: {booking?.emailKH} </Typography>
                                        <Typography variant="body1" mx={1}>phone number:{booking?.phoneNumber} </Typography>
                                        <Typography variant="body1" mx={1}>Địa chỉ {booking?.diaChi} </Typography>
                                    </Grid>
                                    <Grid >
                                        <Typography variant="h6" mx={18}>Hành Khách</Typography>
                                    </Grid>
                                    <Diversity3Icon />
                                    <Typography variant="body1">{countFull}</Typography>
                                </Grid>

                                <Grid container spacing={5} my={1} display="flex">
                                    <Grid>
                                        <Typography variant="body1" mx={20}>Người lớn</Typography>
                                    </Grid>
                                    <Typography variant="body1" mx={1}>{booking?.soChoNL} x {tours?.giaTour} đ</Typography>
                                </Grid>

                                <Grid container spacing={5} my={1} display="flex">
                                    <Grid >
                                        <Typography variant="body1" mx={20}>Trẻ em</Typography>
                                    </Grid>
                                    <Typography variant="body1" mx={4}>{booking?.soChoTreEm} x {tours?.giaTreEm} đ</Typography>
                                </Grid>

                                <Grid container spacing={5} my={1} display="flex">
                                    <Grid  >
                                        <Typography variant="body1" mx={20}>Trẻ nhỏ</Typography>
                                    </Grid>
                                    <Typography variant="body1" mx={3.3}>{booking?.soChoTreNho} x {tours?.giaTreNho} đ</Typography>
                                </Grid>

                                <Grid container spacing={5} my={1} display="flex">
                                    <Grid  >
                                        <Typography variant="body1" mx={20}>Em bé </Typography>
                                    </Grid>
                                    <Typography variant="body1" mx={4.4}>{booking?.soChoEmBe} x {tours?.giaEmBe} đ</Typography>
                                </Grid>
                                <Divider sx={{ margin: '16px 0' }} />

                                <Grid container spacing={5} my={1} display="flex">
                                    <Grid  >
                                        <Typography variant="body1" mx={20}>Tổng cộng </Typography>
                                    </Grid>
                                    <Typography variant="body1" mx={3.3}>{tongGia} đ </Typography>
                                </Grid>
                                <Grid spacing={5} my={5} mx={15}>
                                    <Stack spacing={2} sx={{ width: '100%' }}>
                                        <Button variant="outlined" onClick={handleClick}>
                                            Đặt ngay
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Mã Booking của quý khách là: {booking?.maBooking}
                        </Typography>
                        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
                            Dùng mã booking này để kiểm tra lại thông tin đã đặt !!
                        </Typography>
                        <Grid item my={1} mx={20}>
                            <Button variant="outlined" onClick={goHome}>
                                OK
                            </Button>
                        </Grid>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} mx={10}>
                            Ấn <b>OK</b> để quay về trang chủ !!
                        </Typography>
                    </Box>
                </Modal>
            </Container>

            <Footer />
        </div >
    )
}
