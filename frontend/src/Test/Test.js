import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Container, Typography, Button, Grid } from '@mui/material';
import bookingApi from '../api/bookingApi';

export default function TemporaryDrawer() {
    const [check, setCheck] = useState({
        top: false,
    });
    const [booking, setbooking] = useState();
    const [selectedId, setSelectedId] = useState('');

    const handleInputChange = (e) => {
        setSelectedId(e.target.value);
    };

    const getBookingById = async () => {
        const maBooking = selectedId
        let res = await bookingApi.getBookingById(maBooking)
        setbooking(res);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setCheck({ ...check, [anchor]: open });
    };

    const searchBooking = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, true)}
            onKeyDown={toggleDrawer(anchor, true)}
        >
            <Container >
                <Grid item xs="12" display="flex">
                    <Typography variant="h5" component="h2">
                        <input type="text" value={selectedId} placeholder='Nhập mã Booking' onChange={handleInputChange} />
                    </Typography>
                    <Button onClick={getBookingById}> Tìm kiếm</Button>
                </Grid>
                <Divider />
                <Grid display="flex">
                    <Grid >
                        <p>Tên người đặt : <b>{booking?.nameKH}</b></p>
                        <p>Email : <b>{booking?.emailKH}</b></p>
                        <p>Phone Number : <b>{booking?.phoneNumber}</b></p>
                        <p>Địa chỉ : <b>{booking?.diaChi}</b></p>
                    </Grid>
                    <Grid item xs="6" mx={10}>
                        <p>Số ngời lớn : <b>{booking?.soChoNL}</b></p>
                        <p>Số trẻ em : <b>{booking?.soChoTreEm}</b></p>
                        <p>Số trẻ nhỏ  : <b>{booking?.soChoTreNho}</b></p>
                        <p>Số em bé : <b>{booking?.soChoEmBe}</b></p>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );

    return (
        <div>
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={check[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {searchBooking(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}