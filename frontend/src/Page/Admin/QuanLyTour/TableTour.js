import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Card, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import tourApi from '../../../api/tourApi';
import { useNavigate } from 'react-router-dom';

export default function DataTable() {
    const [tours, setTours] = React.useState([]);
    const navigate = useNavigate();
    const columns = [
        { field: 'maTour', headerName: 'Mã Tour', flex: 0.1 },
        { field: 'tenTour', headerName: 'Tên Tour', flex: 0.25 },
        { field: 'giaTour', headerName: 'Giá Tour', flex: 0.15 },
        { field: 'thoiGian', headerName: 'Thời gian', flex: 0.15 },
        { field: 'ngayKhoiHanh', headerName: 'Ngày bắt đầu', flex: 0.15 },
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


    const handelDelete = (maTour) => {
        console.log(maTour);
    }
    const handelEdit = (maTour) => {
        console.log(maTour);
    }
    const handelXem = (maTour) => {
        navigate(`/tourDetail/${maTour}`)
    }

    // const getTourDetail = async () => {
    //     const res = await tourApi.getTourDetailByMaTour(maTour);
    //     setTours(res);
    // };

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
                </div>

                <DataGrid
                    rows={tours}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />

            </CardContent>
        </Card>
    );
}