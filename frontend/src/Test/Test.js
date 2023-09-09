import React, { useEffect, useState } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar,
    AreaChart, Area,
    PieChart, Pie, Cell,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import { Container, Typography } from '@mui/material';
import bookingApi from '../api/bookingApi';

export default function Test() {

    const [booking, setbooking] = useState();
    const [bookingPT, setbookingPT] = useState([]);

    // api số lượn BK
    const getBookingTrongThang = async () => {
        let res = await bookingApi.getBookingTrongThang()
        setbooking(res)
    };
    useEffect(() => {
        getBookingTrongThang();
        getPhanTramBooking();
    }, [])

    // api phàn trăm
    const getPhanTramBooking = async () => {
        let res = await bookingApi.getPhanTramBooking()
        console.log(res);
        setbookingPT(res)
    };

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ffc658'];
    return (
        <Container >
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

            <Typography variant="h6" gutterBottom>
                Biểu đồ Tròn
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

        </Container>
    )
}
