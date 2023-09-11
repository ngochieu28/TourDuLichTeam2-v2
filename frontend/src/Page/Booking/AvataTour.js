import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import tourApi from '../../api/tourApi';
import { Grid, Box } from '@mui/material';
import { srcImg } from '../../api/srcImg';

export default function AvataTour() {
    const { maTour } = useParams();

    const [tours, setTours] = useState();

    const getTourDetail2 = async () => {
        const res = await tourApi.getTourDetailByMaTour(maTour);
        setTours(res);
    };

    useEffect(() => {
        getTourDetail2()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maTour]);

    return (
        <div>
            <Grid container >
                <Grid item xs='4' >
                    <img
                        src={`${srcImg}/${tours?.image}`}
                        style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                        alt="Image 1"
                    />
                </Grid>
                <Grid item xs='8'>
                    <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                        <h2>{tours?.tenTour}</h2>
                        <p>Khởi hành: <b>{tours?.ngayKhoiHanh}</b></p>
                        <p>Thời gian:<b>{tours?.thoiGian}</b> </p>
                        <p>Nơi khởi hành:<b>{tours?.noiKhoiHanh}</b> </p>
                        <p>Số chỗ còn nhận:<b>{tours?.soCho}</b> </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

