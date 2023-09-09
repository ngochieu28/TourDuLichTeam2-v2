import React from 'react'
import BasicTabs from '../../../conponents/Search';
import { Container } from '@mui/material';
import TableTour from './TableTour';
import { useCheckAdmin } from '../../../util/CheckLogin';
import { useNavigate } from 'react-router-dom';

export default function QuanLyTour() {
    useCheckAdmin();
    return (
        <Container>
            <BasicTabs />
            <TableTour />
        </Container>

    )
}
