/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../conponents/Navbar'
import Footer from '../../conponents/Footer';
import BasicTabs from '../../conponents/Search';
import TourHot from './TourHot';
import DanhSachTour from './DanhSachTour';

const defaultTheme = createTheme();

export default function Album() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />
            <img src="https://media.travel.com.vn/SlideShow/sl_230707_TOURCHATGIATOT_1920-570px.webp" style={{ width: '100%' }} />
            <main>
                <Container>
                    <BasicTabs />
                    <div >
                        <h2 className='title-center' >Du lịch trong nước</h2>
                        <p> Du lịch trong nước luôn là lựa chọn tuyệt vời. Đường bờ biển dài hơn 3260km,
                            những khu bảo tồn thiên nhiên tuyệt vời, những thành phố nhộn nhịp, những di tích lịch sử hào hùng,
                            nền văn hóa độc đáo và hấp dẫn, cùng một danh sách dài những món ăn ngon nhất thế giới, Việt Nam có tất cả những điều đó.
                            Với lịch trình dày, khởi hành đúng thời gian cam kết, Vietravel là công ty lữ hành uy tín nhất hiện nay tại Việt Nam,
                            luôn sẵn sàng phục vụ du khách mọi lúc, mọi nơi, đảm bảo tính chuyên nghiệp và chất lượng dịch vụ tốt nhất thị trường
                        </p>
                    </div >
                    <DanhSachTour />
                    <TourHot />
                </Container>
            </main>
            <Footer />
        </ThemeProvider>
    );
}