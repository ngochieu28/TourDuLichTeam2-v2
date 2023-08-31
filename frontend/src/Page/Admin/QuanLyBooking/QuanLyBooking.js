import React, { useEffect, useState, useCallback } from 'react'
import bookingApi from '../../../api/bookingApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DialogContentText from '@mui/material/DialogContentText';
import { srcImg } from '../../../util/srcImg'
import {
    Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,
    Grid,
} from '@mui/material'

export default function QuanLyBooking() {
    const [bookings, setBookings] = useState([]);
    const [tourBooking, setTourBooking] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [bookingUpdate, setBookingUpdate] = useState();

    // update
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => { setOpenUpdate(true); };
    const handleCloseUpdate = () => { setOpenUpdate(false); };

    // xem
    const [openCheck, setOpenCheck] = useState(false);
    const handleOpenCheck = () => setOpenCheck(true);
    const handleCloseCheck = () => setOpenCheck(false);

    // check xóa 
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };

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
    const handelEdit = async (maBooking) => {
        try {
            let res = await bookingApi.updateBooking(maBooking);
            setBookingUpdate(res);
            handleOpenUpdate();
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // delete
    const handelDelete = async (maBooking) => {
        try {
            let res = await bookingApi.deleteBookingById(maBooking)
            getAllBooking()
            handleClose()
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ width: "100px" }}>Mã booking</TableCell >
                        <TableCell align="center" style={{ width: "170px" }}>Tên người đặt</TableCell >
                        <TableCell align="center" >số lượng người tham gia</TableCell >
                        <TableCell align="center" >Tính năng</TableCell >

                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((item) => (
                        <TableRow key={item.maBooking}>
                            <TableCell align="center" scope="row">{item.maBooking}</TableCell >
                            <TableCell align="center">{item.nameKH}</TableCell >
                            <TableCell align="center">{item.soChoNL + item.soChoTreEm + item.soChoTreNho + item.soChoEmBe}</TableCell >
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
                                    <DialogActions>
                                        {/* Các nút hoặc hành động khác */}
                                    </DialogActions>
                                </Dialog>

                                <Button variant="outlined" onClick={() => handelEdit(item.maBooking)} startIcon={<EditIcon />} />
                                <Dialog open={openUpdate} onClose={handleCloseUpdate}>

                                </Dialog>

                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleOpen} />
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Xác nhận xóa</DialogTitle>
                                    <DialogContent>Bạn có chắc chắn muốn xóa dữ liệu này?</DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Hủy</Button>
                                        <Button onClick={() => handelDelete(item.maBooking)} color="secondary">
                                            Xóa
                                        </Button>
                                    </DialogActions>
                                </Dialog>
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
