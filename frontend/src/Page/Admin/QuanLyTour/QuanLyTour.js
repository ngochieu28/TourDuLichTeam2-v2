import React from 'react'
import BasicTabs from '../../../conponents/Search';
import { Container } from '@mui/material';
import TableTour from './TableTour';
import { useCheckLogin } from '../../../util/CheckAdmin';
import { useNavigate } from 'react-router-dom';

export default function QuanLyTour() {
    useCheckLogin();
    return (
        <Container>
            <BasicTabs />
            <TableTour />
        </Container>

    )
}
