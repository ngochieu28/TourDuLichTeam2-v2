import React, { useEffect } from 'react'
import { useCheckAdmin } from '../../util/CheckLogin'

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar,
    AreaChart, Area,
    PieChart, Pie, Cell,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import { Container, Grid, Typography } from '@mui/material';
import { useState } from 'react'
import tourApi from '../../api/tourApi';
import bookingApi from '../../api/bookingApi';

export default function AdminPage() {
    useCheckAdmin();

    // thống kê tour
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#9E9E9E', '#795548', '#CDDC39'];

    const [thongKeSoTourTheoThangData, setThongKeSoTourTheoThangData] = useState();
    const [thongKeTourVoiNoiKhoiHanhData, setThongKeTourVoiNoiKhoiHanhData] = useState();
    const [thongKeSoChoData, setThongKeSoChoData] = useState([]);

    const thongKeSoTourTheoThang = async () => {
        const res = await tourApi.thongKeSoTourTheoThang()
        setThongKeSoTourTheoThangData(res);
    }

    const thongKeTourVoiNoiKhoiHanh = async () => {
        const res = await tourApi.thongKeTourVoiNoiKhoiHanh()
        setThongKeTourVoiNoiKhoiHanhData(res);
    }

    const thongKeSoCho = async () => {
        const res = await tourApi.thongKeSoCho()
        setThongKeSoChoData(res);
    }

    useEffect(() => {
        thongKeSoTourTheoThang();
        thongKeTourVoiNoiKhoiHanh();
        thongKeSoCho();
    }, [])

    // thống kê booking 

    const [booking, setbooking] = useState();
    const [bookingPT, setbookingPT] = useState([]);
    const [doanhThu, setDoanhThu] = useState([]);

    // api số lượn BK
    const getBookingTrongThang = async () => {
        let res = await bookingApi.getBookingTrongThang()
        setbooking(res)
    };
    useEffect(() => {
        getBookingTrongThang();
        getPhanTramBooking();
        getDoanhThuBooking();
    }, [])

    // api phàn trăm
    const getPhanTramBooking = async () => {
        let res = await bookingApi.getPhanTramBooking()
        setbookingPT(res)
    };

    // api doanh thu 
    const getDoanhThuBooking = async () => {
        let res = await bookingApi.getDoanhThuBooking()
        setDoanhThu(res)
    };

    return (
        <Container>
            <h1 style={{ textAlign: 'center' }}>AdminPage</h1>
            <Grid container spacing={1} >
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Thống kê số tour theo tháng
                    </Typography>
                    <BarChart
                        width={400}
                        height={300}
                        data={thongKeSoTourTheoThangData}
                        margin={{ top: 5, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="thang" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalTour" fill="#8884d8" />
                    </BarChart>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Thống kê tour với nơi khởi hành
                    </Typography>
                    <BarChart
                        width={400}
                        height={300}
                        data={thongKeTourVoiNoiKhoiHanhData}
                        margin={{ top: 5, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="noiKhoiHanh" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalTour" fill="#82ca9d" />
                        <Bar dataKey="soChoTrong" fill="#ffc658" />
                    </BarChart>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Thống kê tỉ lệ chỗ đặt
                    </Typography>
                    <PieChart width={500} height={300}>
                        <Pie
                            data={thongKeSoChoData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {thongKeSoChoData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Biểu đồ doanh thu Booking trong các tháng
                    </Typography>
                    <LineChart
                        width={500}
                        height={300}
                        data={doanhThu}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="thang" />
                        <YAxis dataKey="tongTienTrongThang" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="tongTienTrongThang" stroke="#8884d8" />
                    </LineChart>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Biểu đồ thống kê số lượng booking trong tháng
                    </Typography>
                    <BarChart
                        width={500}
                        height={300}
                        data={booking}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="thoiGianDat" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="soLuongTheoThang" fill="#82ca9d" />
                    </BarChart>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Biểu thống kê số lượng khách theo độ tuổi
                    </Typography>
                    <PieChart width={500} height={300}>
                        <Pie
                            data={bookingPT}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {bookingPT.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </Grid>
            </Grid>
        </Container>
    )
}
