import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

const UpdateComponent = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleUpdate = () => {
        setOpen(true);
        // Gửi yêu cầu cập nhật đến trang admin

        // Xử lý phản hồi từ server
        setLoading(true);
        // Đợi admin xác nhận
        setTimeout(() => {
            setLoading(false);
            setSnackbarOpen(true);
            setOpen(false);
        }, 3000);
    };

    // const handleUpdate = () => {
    //     // Gửi yêu cầu cập nhật đến trang admin
    //     axios
    //         .post('/api/update', { data: { needsConfirmation: true } })
    //         .then(response => {
    //             // Xử lý phản hồi từ server
    //             if (response.data.status === 'confirmation_required') {
    //                 // Hiển thị thông báo yêu cầu xác nhận đến người dùng
    //                 // Lưu trạng thái yêu cầu cập nhật trong ứng dụng ReactJS
    //             } else if (response.data.status === 'updated') {
    //                 // Hiển thị thông báo cập nhật thành công đến người dùng
    //                 // Thực hiện các hành động liên quan đến cập nhật
    //             }
    //         })
    //         .catch(error => {
    //             // Xử lý lỗi khi gửi yêu cầu
    //         });
    // };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
            </Button>
            <Dialog open={open}>
                <DialogTitle>Waiting for Admin Confirmation</DialogTitle>
                <DialogContent>
                    {loading ? <CircularProgress /> : 'Waiting for admin to confirm the update...'}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} message="Update confirmed!" />
        </div>
    );
};

export default UpdateComponent;