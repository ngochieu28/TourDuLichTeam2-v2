/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import tourApi from '../../api/tourApi'
import { Card, CardContent, Typography, CardActions, Button, Grid, Pagination, PaginationItem, PaginationLink } from '@mui/material';
import { CreditCard } from '@mui/icons-material';
import { AppConsumer } from '../../store';

export default function DanhSachTour() {
    const [state, dispatch] = AppConsumer();
    const [tours, setTours] = useState([]);
    const [totalSize, setTotalSize] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getDanhSachTour = async (page, size, sortField, sortType, searchNoiKhoiHanh, searchDiemDen, searchThoiGian) => {
        const res = await tourApi.getAllTour(page, size, sortField, sortType, searchNoiKhoiHanh, searchDiemDen, searchThoiGian);
        setTours(res.data.content);
        setTotalSize(res.data.totalElements);
    };

    useEffect(() => {
        getDanhSachTour(currentPage);
    }, [currentPage]);

    useEffect(() => {
        console.log(state);
        getDanhSachTour(1, 9, 'ngayKhoiHanh', 'desc', state.searchNoiKhoiHanh, state.searchDiemDen, state.searchThoiGian);
    }, [state.searchDiemDen || state.searchNoiKhoiHanh || state.searchThoiGian]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const pageSize = 9;
    const pageCount = Math.ceil(totalSize / pageSize);

    return (
        <div style={{ margin: '2rem 0' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <h3>Danh sách tour du lịch trong nước</h3>
                </Grid>
                {tours &&
                    tours.length > 0 &&
                    tours.map((item) => {
                        return (
                            <Grid item xs={4} key={item.maTour}>
                                <Card className='card'>
                                    <div style={{ position: 'relative', height: '245px' }}>
                                        <img
                                            src={`http://192.168.1.163:4000/${item.image}`}
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
                                            <CreditCard /> <b>{item.maTour}</b>
                                        </Typography>
                                        <Typography>
                                            Nơi khởi hành: <b>{item.noiKhoiHanh}</b>
                                        </Typography>
                                        <Typography>
                                            <h3 style={{ color: 'red', display: 'inline' }}>{item.giaTour}đ</h3>
                                        </Typography>

                                        <CardActions>
                                            <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                                                <a href={`#${item.maTour}`}>Xem chi tiết</a>
                                            </Button>
                                            <Button variant="contained" color="secondary">
                                                Đặt ngay
                                            </Button>
                                        </CardActions>
                                        <Typography style={{ textAlign: 'right' }}>
                                            <b>Số chỗ còn nhận:</b>{' '}
                                            <span style={{ color: 'red', display: 'inline' }}>{item.soCho}</span>
                                        </Typography>
                                    </CardContent>
                                </Card>
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
