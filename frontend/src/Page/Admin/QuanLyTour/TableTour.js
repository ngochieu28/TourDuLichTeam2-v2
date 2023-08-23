import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Card, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import tourApi from '../../../api/tourApi';
import { useNavigate } from 'react-router-dom';
import { AppConsumer } from '../../../store';
import { useCheckLogin } from '../../../util';

export default function DataTable() {
    useCheckLogin();
    const [tours, setTours] = React.useState([]);
    const [state, dispatch] = AppConsumer();
    const navigate = useNavigate();
    const columns = [
        { field: 'maTour', headerName: 'Mã Tour', flex: 0.15 },
        { field: 'tenTour', headerName: 'Tên Tour', flex: 0.25 },
        { field: 'giaTour', headerName: 'Giá Tour', flex: 0.10 },
        { field: 'thoiGian', headerName: 'Thời gian', flex: 0.10 },
        { field: 'ngayKhoiHanh', headerName: 'Ngày bắt đầu', flex: 0.10 },
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

    const handelDelete = (maTour) => {
        console.log(maTour);
    };

    const handelEdit = (maTour) => {
        console.log(maTour);
    };

    const handelXem = (maTour) => {
        navigate(`/tourDetail/${maTour}`);
    };

    const [selectedRows, setSelectedRows] = React.useState([]);

    const handleSelectionModelChange = (selectionModel) => {
        console.log(selectionModel);
        setSelectedRows(selectionModel.map((row) => row.maTour));
    };
    return (
        <Card>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <Typography variant="h6" component="h1" style={{ textAlign: 'left' }}>
                        Danh sách Tours
                    </Typography>
                    <Button variant="outlined" startIcon={<AddIcon />} style={{ textAlign: 'right' }}>
                        Thêm mới
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        style={{ textAlign: 'right' }}
                        onClick={() => {
                            console.log(selectedRows);
                        }}
                    >
                        Test
                    </Button>
                </div>
                <DataGrid
                    rows={tours}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={handleSelectionModelChange}
                />
            </CardContent>
        </Card>
    );
}