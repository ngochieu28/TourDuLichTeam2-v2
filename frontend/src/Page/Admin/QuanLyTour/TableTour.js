import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Card, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import tourApi from '../../../api/tourApi';
import { Link, useNavigate } from 'react-router-dom';
import { AppConsumer } from '../../../store';
import { useCheckAdmin } from '../../../util/CheckLogin';



export default function DataTable() {
    useCheckAdmin();
    const [open, setOpen] = React.useState(false);
    const [maTourClick, setMaTourClick] = React.useState();
    const [tours, setTours] = React.useState([]);
    const [state, dispatch] = AppConsumer();
    const navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'maTour', headerName: 'Mã Tour', flex: 0.15 },
        { field: 'tenTour', headerName: 'Tên Tour', flex: 0.25 },
        { field: 'giaTour', headerName: 'Giá Tour', flex: 0.10 },
        { field: 'thoiGian', headerName: 'Thời gian', flex: 0.10 },
        {
            field: 'ngayKhoiHanhDate',
            headerName: 'Ngày bắt đầu',
            flex: 0.10,
            cellClassName: (params) => {
                const ngayKhoiHanh = new Date(params.value);
                const now = new Date();
                const ngayKhoiHanhDateOnly = new Date(
                    ngayKhoiHanh.getFullYear(),
                    ngayKhoiHanh.getMonth(),
                    ngayKhoiHanh.getDate()
                );
                const nowDateOnly = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate()
                );

                if (ngayKhoiHanhDateOnly < nowDateOnly) {
                    return 'tour-het-han'; // Lớp CSS để tô màu đỏ
                } else if (ngayKhoiHanhDateOnly.getTime() === nowDateOnly.getTime()) {
                    return 'tour-dang-dien-ra'; // Lớp CSS để tô màu xanh
                }
                return 'tour-sap-toi'; // Không thay đổi màu sắc
            },
        },
        { field: 'soCho', headerName: 'Số chỗ còn', flex: 0.10 },
        {
            field: 'action',
            headerName: 'Tác vụ',
            flex: 0.2,
            sortable: false,
            renderCell: (params) => (
                <>
                    <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={() => handelXem(params.row.maTour)}>
                        Xem
                    </Button>
                    &nbsp;
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handelEdit(params.row.maTour)}>
                        Sửa
                    </Button>
                    &nbsp;
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handelDelete(params.row.maTour)}>
                        Xóa
                    </Button>
                </>
            ),
        },
    ];

    const getDanhSachTour = async (page, size, sortField, sortType, searchNoiKhoiHanh, searchDiemDen, searchThoiGian) => {
        const res = await tourApi.getAllTour(page, size, sortField, sortType, searchNoiKhoiHanh, searchDiemDen, searchThoiGian);
        setTours(res.content);
    };

    React.useEffect(() => {
        getDanhSachTour(1, 99999);
    }, []);

    React.useEffect(() => {
        getDanhSachTour(1, 99999, 'ngayKhoiHanh', 'desc', state.searchNoiKhoiHanh, state.searchDiemDen, state.searchThoiGian);
    }, [state.searchDiemDen, state.searchNoiKhoiHanh, state.searchThoiGian]);

    const handelDelete = async (maTour) => {
        setMaTourClick(maTour)
        setOpen(true);
    };

    const handelXacNhanXoa = async () => {
        await tourApi.deleteByMaTour(maTourClick)
        getDanhSachTour(1, 99999);
        setOpen(false)
    }

    const handelEdit = (maTour) => {
        navigate(`/admin/quan-ly-tour/editTour/${maTour}`);
    };

    const handelXem = (maTour) => {
        navigate(`/tourDetail/${maTour}`);
    };


    return (
        <Card>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <Typography variant="h6" component="h1" style={{ textAlign: 'left' }}>
                        Danh sách Tours
                    </Typography>
                    <Link to={'/admin/addTour'}><Button variant="outlined" startIcon={<AddIcon />} style={{ textAlign: 'right' }}>
                        Thêm mới
                    </Button></Link>

                </div>
                <DataGrid
                    rows={tours}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                />
            </CardContent>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
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
                    <Button onClick={handelXacNhanXoa} >
                        Xác nhận
                    </Button>
                    <Button color="primary" onClick={() => handleClose()}>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>

    );
}