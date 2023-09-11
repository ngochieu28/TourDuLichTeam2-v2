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
        setbookingPT(res)
    };

    const lineChartData = [
        { name: 'Tháng 1', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Tháng 2', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Tháng 3', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Tháng 4', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Tháng 5', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Tháng 6', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Tháng 7', uv: 3490, pv: 4300, amt: 2100 },
    ];


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

            <Typography variant="h6" gutterBottom>
                Biểu đồ Đường
            </Typography>
            <LineChart
                width={500}
                height={300}
                data={lineChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                <Line type="monotone" dataKey="amt" stroke="#ffc658" />
            </LineChart>
        </Container>
    )
}
