import React, { useState, useEffect } from 'react'
import Header2 from '../../conponents/Navbar'
import Footer from '../../conponents/Footer'
import tourApi from '../../api/tourApi';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Grid, Box, Typography, TextField, Radio, RadioGroup, FormControlLabel

} from '@mui/material';

export default function ThanhToan() {

    const [selectedMethod, setSelectedMethod] = useState('');
    const [tours, setTours] = useState();

    // avatar Tour
    const { maTour } = useParams();

    const getTourDetail2 = async () => {
        const res = await tourApi.getTourDetailByMaTour(maTour);
        setTours(res.data);
    };

    useEffect(() => {
        getTourDetail2()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maTour]);

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    const renderPaymentInfo = () => {
        if (selectedMethod === 'cash') {
            return <Box
                border="1px solid #ccc"
                borderRadius={4}
                padding={2}
                width={400}
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
                width={400}
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
                width={400}
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
            </Box>
                ;
        }
        return null;
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
            <Box display="flex">
                <Box spacing={5} item xs={8} pl={20} pr={10}>
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
                <Box
                    border="1px solid #ccc"
                    borderRadius={4}
                    padding={2}
                    width={400}
                >
                    <Grid item xs={2} pl={25} pr={10} my={5}>
                        <h2>Tóm tắt chuyến đi</h2>
                        <img
                            src={`http://192.168.0.101:4000/${tours?.image}`}
                            style={{ height: '50%', width: '50%', objectFit: 'cover', borderRadius: '10px' }}
                            alt="Image 1"
                        />
                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                            <h2>{tours?.tenTour}</h2>
                        </div>
                    </Grid>

                </Box>
            </Box>



            <Footer />
        </div >
    )
}
