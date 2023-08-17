import Header from '../../conponents/Navbar'
import Footer from '../../conponents/Footer';
import Container from '@mui/material/Container';
import { Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { useParams } from 'react-router-dom';

export default function TourDetail() {
    const { maTour } = useParams();

    // BreadCrumbs
    const BreadCrumb = () => {
        function handleClick(event) {
            event.preventDefault();
            alert('You clicked a breadcrumb.');
        }
        return (
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Du lịch trong nước
                    </Link>
                    <Typography color="text.primary">Tên Tour</Typography>
                </Breadcrumbs>
            </div>

        )
    }

    return (
        <>
            <Header />
            <Container>
                <BreadCrumb />
                <br />
                <div style={{ display: 'flex', alignItems: 'center', color: '#4d4aef' }}>
                    <ConfirmationNumberOutlinedIcon style={{ fontSize: '14px' }} />
                    <p style={{ fontSize: '14px', marginLeft: '5px' }}>{maTour}</p>
                </div>
            </Container>
            <Footer />
        </>
    )
}

