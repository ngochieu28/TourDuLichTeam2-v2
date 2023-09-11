/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import tourApi from '../../api/tourApi'
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { srcImg } from '../../api/srcImg';

export default function TourHot() {
    const [tourHots, setTourHots] = useState([]);

    const getTourHot = async () => {
        const res = await tourApi.getTourHot()
        setTourHots(res.content)
    }

    useEffect(() => {
        getTourHot()
    }, [])

    return (
        <div style={{ margin: '2rem 0' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <h3>Tour hot trong nước</h3>
                </Grid>
                {tourHots && tourHots.length > 0 && tourHots.map((item) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={item.maTour}>
                            <Link to={`/tourDetail/${item.maTour}`}>
                                <Card className='card'>
                                    <div style={{ position: 'relative', height: '245px' }}>
                                        <img
                                            src={`${srcImg}/${item.image}`}
                                            alt="Card image cap"
                                            style={{ position: 'relative', width: '100%', height: '100%' }}
                                        />
                                        <Typography className='luotQuanTam' variant="body2">
                                            {item.luotQuanTam} quan tâm
                                        </Typography>
                                    </div>
                                    <CardContent>
                                        <Typography>
                                            {item.ngayKhoiHanh} - {item.thoiGian}
                                        </Typography>
                                        <Typography component="div" style={{ height: '120px' }}>
                                            <a href="#" className="tenTour">
                                                <b>  {item.tenTour}</b>

                                            </a>
                                        </Typography>

                                        <Typography>
                                            Mã Tour:
                                            <br />
                                            <ConfirmationNumberOutlinedIcon style={{ fontSize: '18px' }} /> <b>{item.maTour}</b>
                                        </Typography>
                                        <Typography>
                                            Nơi khởi hành: <b>{item.noiKhoiHanh}</b>
                                        </Typography>
                                        <Typography>
                                            <h3 style={{ color: 'red', display: 'inline' }}>{item.giaTourString}đ</h3>
                                        </Typography>

                                        <CardActions >
                                            <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                                                Xem chi tiết
                                            </Button>
                                        </CardActions>
                                        <Typography style={{ textAlign: 'right' }}>
                                            <b>Số chỗ còn nhận:</b> <span style={{ color: 'red', display: 'inline' }}>{item.soCho}</span>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid >
        </div>
    )
}
