import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Card, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const columns = [
    { field: 'maTour', headerName: 'Mã Tour', flex: 0.1 },
    { field: 'tenTour', headerName: 'Tên Tour', flex: 0.25 },
    { field: 'giaTour', headerName: 'Giá Tour', flex: 0.15 },
    { field: 'soNgay', headerName: 'Số ngày', flex: 0.15 },
    { field: 'ngayKhoiHanh', headerName: 'Ngày bắt đầu', flex: 0.15 },
    {
        field: 'action',
        headerName: 'Tác vụ',
        flex: 0.2,
        sortable: false,
        renderCell: (params) => (
            <>
                <Button variant="outlined" startIcon={<VisibilityIcon />}>
                    Xem
                </Button>
                &nbsp;
                <Button variant="outlined" startIcon={<EditIcon />}>
                    Sửa
                </Button>
                &nbsp;
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Xóa
                </Button>
            </>
        ),
    },
];

const rows = [
    { id: 1, maTour: 1, tenTour: 'Snow', giaTour: 'Jon', soNgay: 35, ngayKhoiHanh: 'test' },
    { id: 2, maTour: 2, tenTour: 'LannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannister', giaTour: 'Cersei', soNgay: 42, ngayKhoiHanh: 'test' },
    { id: 3, maTour: 3, tenTour: 'Lannister', giaTour: 'Jaime', soNgay: 45, ngayKhoiHanh: 'test' },
    { id: 4, maTour: 4, tenTour: 'Stark', giaTour: 'Arya', soNgay: 16, ngayKhoiHanh: 'test' },
    { id: 5, maTour: 5, tenTour: 'Targaryen', giaTour: 'Daenerys', soNgay: null, ngayKhoiHanh: 'test' },
    { id: 6, maTour: 6, tenTour: 'Melisandre', giaTour: null, soNgay: 150, ngayKhoiHanh: 'test' },
    { id: 7, maTour: 7, tenTour: 'Clifford', giaTour: 'Ferrara', soNgay: 44, ngayKhoiHanh: 'test' },
    { id: 8, maTour: 8, tenTour: 'Frances', giaTour: 'Rossini', soNgay: 36, ngayKhoiHanh: 'test' },
    { id: 9, maTour: 9, tenTour: 'Roxie', giaTour: 'Harvey', soNgay: 65, ngayKhoiHanh: 'test' },
    { id: 10, maTour: 10, tenTour: 'Snow', giaTour: 'Jon', soNgay: 35, ngayKhoiHanh: 'test' },
    { id: 2, maTour: 2, tenTour: 'LannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannister', giaTour: 'Cersei', soNgay: 42, ngayKhoiHanh: 'test' },
    { id: 3, maTour: 3, tenTour: 'Lannister', giaTour: 'Jaime', soNgay: 45, ngayKhoiHanh: 'test' },
    { id: 4, maTour: 4, tenTour: 'Stark', giaTour: 'Arya', soNgay: 16, ngayKhoiHanh: 'test' },
    { id: 5, maTour: 5, tenTour: 'Targaryen', giaTour: 'Daenerys', soNgay: null, ngayKhoiHanh: 'test' },
    { id: 6, maTour: 6, tenTour: 'Melisandre', giaTour: null, soNgay: 150, ngayKhoiHanh: 'test' },
    { id: 7, maTour: 7, tenTour: 'Clifford', giaTour: 'Ferrara', soNgay: 44, ngayKhoiHanh: 'test' },
    { id: 8, maTour: 8, tenTour: 'Frances', giaTour: 'Rossini', soNgay: 36, ngayKhoiHanh: 'test' },
    { id: 9, maTour: 9, tenTour: 'Roxie', giaTour: 'Harvey', soNgay: 65, ngayKhoiHanh: 'test' },
];

export default function DataTable() {
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
                    rows={rows}
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