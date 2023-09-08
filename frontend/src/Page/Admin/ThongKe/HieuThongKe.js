import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar,
    AreaChart, Area,
    PieChart, Pie, Cell,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import { Container, Grid, Typography } from '@mui/material';
import tourApi from '../../../api/tourApi';

const Chart = () => {
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ffc658', '#ffc658', '#ffc658'];

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

    return (
        <Container>
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
                        Biểu đồ Tròn
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
            </Grid>
        </Container>
    );
};

export default Chart;