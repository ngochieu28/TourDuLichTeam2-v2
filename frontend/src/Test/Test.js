import React, { useEffect, useState, useCallback } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DialogContentText from '@mui/material/DialogContentText';
import {
    Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,
    Grid,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import bookingApi from '../api/bookingApi';
import { DataGrid } from '@mui/x-data-grid';

export default function Test() {

    const [bookings, setBookings] = useState([]);
    const [tourBooking, setTourBooking] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [bookingClink, setBookingClink] = useState()

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
            }
            getAllBooking()
        } catch (error) {
            console.log('Error:', error);
        };
    }

    // delete
    const handleDelete = async (maBooking) => {
        setBookingClink(maBooking)
        setOpen(true);
    }

    const handelXacNhanDelete = async (maBooking) => {
        try {
            let res = await bookingApi.deleteBookingById(maBooking)
            getAllBooking()
            setOpen(false)
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const columns = [
        { field: 'maBooking', headerName: 'MaBooking', flex: 0.10 },
        { field: 'nameKH', headerName: 'Họ và tên', flex: 0.20 },
        {
            field: 'number',
            headerName: 'Số người tham gia',
            valueGetter: (params) =>
                `${params.row.soChoNL + params.row.soChoTreEm + params.row.soChoTreNho + params.row.soChoEmBe}`,
            flex: 0.2,
        },
        { field: 'status', headerName: 'Trạng thái', flex: 0.2 },
        {
            field: 'action1',
            headerName: 'Tính Năng',
            flex: 0.2,
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            renderCell: (params) => (
                <>
                    <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={() => handelCheck(params.row.maBooking)}>
                        Xem
                    </Button>
                    &nbsp;
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(params.row.maBooking)}>
                        Xóa
                    </Button>
                </>
            ),
        },
        {
            field: 'action2',
            headerName: 'Yêu cầu update',
            flex: 0.2,
            renderCell: (params) => (
                <>
                    <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => handelUpdate(params.row.maBooking, 1)}></Button>
                    &nbsp;
                    <Button variant="outlined" startIcon={<DoneIcon />} onClick={() => handelUpdate(params.row.maBooking, 2)}></Button>
                </>
            ),
        },
    ];
    return (
        <div>
            <Container>
                <DataGrid
                    rows={bookings}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                />

                <Dialog
                    open={open}
                    onClose={false}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Xác nhận xóa tour"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <h4>
                                Bạn chắc chắn muốn xóa tour này?
                            </h4>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handelXacNhanDelete} >
                            Xác nhận
                        </Button>
                        <Button color="primary" onClick={() => setOpen(false)}>
                            Hủy
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    )
}
