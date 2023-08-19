import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import tourApi from '../../api/tourApi';
import { Grid, Box } from '@mui/material';

export default function AvataTour() {
    const { maTour } = useParams();

    const [tours, setTours] = useState();

    const getTourDetail2 = async () => {
        const res = await tourApi.getTourDetailByMaTour(maTour);
        setTours(res.data);
    };

    useEffect(() => {
        getTourDetail2()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maTour]);

    return (
        <div>
            <Box display="flex">
                <Grid item xs={2} >
                    <img
                        src={`http://192.168.0.101:4000/${tours?.image}`}
                        style={{ height: '70%', width: '70%', objectFit: 'cover', borderRadius: '10px' }}
                        alt="Image 1"
                    />
                </Grid>
                <Grid item xs='5'>
                    <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                        <h2>{tours?.tenTour}</h2>
                        <h2>Khởi hành: {tours?.ngayKhoiHanh}</h2>
                        <h2>Thời gian: {tours?.thoiGian}</h2>
                        <h2>Nơi khởi hành: {tours?.noiKhoiHanh}</h2>
                        <h2>Số chỗ còn nhận: {tours?.soCho}</h2>
                    </div>
                </Grid>
            </Box>
        </div>
    )
}

