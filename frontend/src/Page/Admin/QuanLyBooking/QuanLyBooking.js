import React, { useEffect, useState, useCallback } from 'react'
import bookingApi from '../../../api/bookingApi';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DialogContentText from '@mui/material/DialogContentText';
import {
    Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,
    Grid,
} from '@mui/material'
import { useCheckAdmin } from '../../../util/CheckLogin'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { srcImg } from '../../../api/srcImg';

export default function QuanLyBooking() {
    const [bookings, setBookings] = useState([]);
    const [tourBooking, setTourBooking] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // xem
    const [openCheck, setOpenCheck] = useState(false);
    const handleOpenCheck = () => setOpenCheck(true);
    const handleCloseCheck = () => setOpenCheck(false);

    // phân trang
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // call API
    const getAllBooking = async (maBooking, nameKH) => {
        let res = await bookingApi.getAll(maBooking, nameKH)
        setBookings(res)
    }

    useEffect(() => {
        getAllBooking()
    }, [])

    // xem
    const handelCheck = async (maBooking) => {
        try {
            let res = await bookingApi.getTourBooking(maBooking)
            setTourBooking(res)
            handleOpenCheck()
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // update
    const handelUpdate = async (maBooking, status) => {
        try {
            if (status == 1) {
                await bookingApi.updateStatusBooking(maBooking, 1)
            } else if (status === 2) {
                await bookingApi.updateStatusBooking(maBooking, 2);
            } else if (status === 3) {
                await bookingApi.updateStatusBooking(maBooking, 3);
            }
            getAllBooking()
        } catch (error) {
            console.log('Error:', error);
        };
    }

    useCheckAdmin();
    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ width: "100px" }}>Mã booking</TableCell >
                        <TableCell align="center" style={{ width: "170px" }}>Tên người đặt</TableCell >
                        <TableCell align="center" >Email</TableCell >
                        <TableCell align="center" >Số điện thoại</TableCell >
                        <TableCell align="center" >số lượng người tham gia</TableCell >
                        <TableCell align="center"> Trạng thái Booking</TableCell >
                        <TableCell align="center" >Tính năng</TableCell >
                        <TableCell align="center" >Yêu cầu update </TableCell >
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((item) => (
                        <TableRow key={item.maBooking}>
                            <TableCell align="center" scope="row">{item.maBooking}</TableCell >
                            <TableCell align="center">{item.nameKH}</TableCell >
                            <TableCell align="center">{item.emailKH}</TableCell >
                            <TableCell align="center">{item.phoneNumber}</TableCell >
                            <TableCell align="center">{item.soChoNL + item.soChoTreEm + item.soChoTreNho + item.soChoEmBe}</TableCell >
                            <TableCell align="center" style={{
                                color: (item.status === 'Booking chưa được duyệt') ? 'blue' :
                                    (item.status === 'Booking đã được duyệt') ? 'green' :
                                        (item.status === 'Booking bị từ chối duyệt') ? 'orange' :
                                            (item.status === 'Booking đã bị hủy') ? 'red' : 'inherit'
                            }}>
                                {item.status}
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={() => handelCheck(item.maBooking)} />
                                <Dialog open={openCheck} onClose={handleCloseCheck}>
                                    <DialogTitle>
                                        <Grid container spacing={1}>
                                            <Grid item xs={4}>
                                                <img
                                                    src={`${srcImg}/${tourBooking?.image}`}
                                                    style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                                    alt="Image 1"
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                                                    <h4>{tourBooking?.tenTour}</h4>
                                                    <p>Khởi hành: <b>{tourBooking?.ngayKhoiHanh}</b></p>
                                                    <p>Thời gian:<b>{tourBooking?.thoiGian}</b> </p>
                                                    <p>Nơi khởi hành:<b>{tourBooking?.noiKhoiHanh}</b> </p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Grid container width={500} spacing={5}>
                                            <Grid item xs={6}>
                                                <DialogContentText>
                                                    <p>Tên người đặt: <b>{tourBooking?.nameKH}</b></p>
                                                    <p>Email: <b>{tourBooking?.emailKH}</b></p>
                                                    <p>PhoneNumber: <b>{tourBooking?.phoneNumber}</b></p>
                                                    <p>Địa chỉ: <b>{tourBooking?.diaChi}</b></p>
                                                </DialogContentText>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <DialogContentText>
                                                    <p>Số người lớn: <b>{tourBooking?.soChoNL}</b></p>
                                                    <p>Số trẻ em: <b>{tourBooking?.soChoTreEm}</b></p>
                                                    <p>Số trẻ nhỏ: <b>{tourBooking?.soChoTreNho}</b></p>
                                                    <p>Số em bé: <b>{tourBooking?.soChoEmBe}</b></p>
                                                </DialogContentText>
                                            </Grid>
                                        </Grid>
                                    </DialogContent>
                                </Dialog>

                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handelUpdate(item.maBooking, 3)} />
                            </TableCell >
                            <TableCell align="center" scope="row">
                                <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => handelUpdate(item.maBooking, 1)} />
                                <Button variant="outlined" startIcon={<DoneIcon />} onClick={() => handelUpdate(item.maBooking, 2)} />
                            </TableCell >
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={bookings.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container >
    )
}
