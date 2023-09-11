/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from 'react';
import tourApi from '../../api/tourApi'
import fileApi from '../../api/fileApi';
import { Card, CardContent, Typography, CardActions, Button, Grid, Pagination } from '@mui/material';
import { AppConsumer } from '../../store';
import { Link } from 'react-router-dom';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { srcImg } from '../../api/srcImg';

export default function DanhSachTour() {
    const [state, dispatch] = AppConsumer();
    const [tours, setTours] = useState([]);
    const [totalSize, setTotalSize] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const danhSachTourRef = useRef(null);
    const pageSize = 9;
    const pageCount = Math.ceil(totalSize / pageSize);

    const getDanhSachTour = async (page, size, sortField, sortType, searchNoiKhoiHanh, searchDiemDen, searchThoiGian) => {
        const res = await tourApi.getAllTour(page, size, sortField, sortType, searchNoiKhoiHanh, searchDiemDen, searchThoiGian);
        setTours(res.content);
        setTotalSize(res.totalElements);
    };

    const scrollToTop = () => {
        if (danhSachTourRef.current) {
            danhSachTourRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        getDanhSachTour(currentPage);
        scrollToTop();
    }, [currentPage]);

    useEffect(() => {
        getDanhSachTour(1, 9, 'ngayKhoiHanh', 'desc', state.searchNoiKhoiHanh, state.searchDiemDen, state.searchThoiGian);
        scrollToTop();
    }, [state.searchDiemDen || state.searchNoiKhoiHanh || state.searchThoiGian]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    return (
        <div style={{ margin: '2rem 0' }} ref={danhSachTourRef} className='danh-sach-tour'>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <h3>Danh sách tour du lịch trong nước</h3>
                </Grid>
                {tours &&
                    tours.length > 0 &&
                    tours.map((item) => {
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
                                            <Typography className="luotQuanTam" variant="body2">
                                                {item.luotQuanTam} quan tâm
                                            </Typography>
                                        </div>
                                        <CardContent>
                                            <Typography>
                                                {item.ngayKhoiHanh} - {item.thoiGian}
                                            </Typography>
                                            <Typography component="div" style={{ height: '120px' }}>
                                                <a href="#" className="tenTour">
                                                    <b> {item.tenTour}</b>
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

                                            <CardActions>
                                                <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                                                    Xem chi tiết
                                                </Button>
                                            </CardActions>
                                            <Typography style={{ textAlign: 'right' }}>
                                                <b>Số chỗ còn nhận:</b>{' '}
                                                <span style={{ color: 'red', display: 'inline' }}>{item.soCho}</span>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        );
                    })}
                <Grid xs="12" className="d-flex justify-content-center mt-2">
                    <Pagination
                        count={pageCount}
                        variant="outlined"
                        shape="rounded"
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
