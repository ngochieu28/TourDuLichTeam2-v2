import React from 'react'
import FormBooking from './formBooking';
import AvataTour from './AvataTour';
import { Container } from '@mui/system';
import Footer from '../../conponents/Footer';
import Header1 from '../../conponents/Navbar'

const Booking = () => {

    return (
        <div>
            <Header1 />
            <Container >
                <FormBooking />
            </Container>
            <Footer />
        </div>

    )
}

export default Booking;