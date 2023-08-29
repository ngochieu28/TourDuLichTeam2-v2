import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';

export default function BasicAccordion() {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ textAlign: 'center' }}>Những thông tin cần lưu ý</h2>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography><h4>Giá tour bao gồm</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>Xe tham quan (15, 25, 35, 45 chỗ tùy theo số lượng khách) theo chương trình</li>
                                    <li>Vé máy bay khứ hồi</li>
                                    <li>Hành lý ký gửi: 20 kg, xách tay 7 kg/1 khách</li>
                                    <li>Khách sạn theo tiêu chuẩn 2 khách/phòng hoặc 3 khách/phòng</li>
                                    <li>Ăn theo chương trình, thực đơn món Việt (set menu)</li>
                                    <li>Vé tham quan theo chương trình</li>
                                    <li>Hướng dẫn viên tiếng Việt nối tuyến</li>
                                    <li>Bảo hiểm du lịch với mức bồi thường cao nhất 120.000.000đ/vụ</li>
                                    <li>Nón Vietravel + Nước suối + Khăn lạnh</li>
                                    <li>Thuế VAT</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><h4>Giá tour không bao gồm</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>Vé cáp treo</li>
                                    <li>Chi phí hủy đổi hành trình bay, hành lý quá cước, giặt ủi,…</li>
                                    <li>Chi phí cá nhân trong quá trình đi tour.</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><h4>Giá trẻ em</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>Trẻ em dưới 5 tuổi: không thu phí dịch vụ, bố mẹ tự lo cho bé và thanh toán các chi phí phát sinh (đối với các dịch vụ tính phí theo chiều cao…). Hai người lớn chỉ được kèm 1 trẻ em dưới 5 tuổi, trẻ em thứ 2 sẽ đóng phí theo qui định dành cho độ tuổi từ 5 đến dưới 12 tuổi và phụ thu phòng đơn. Vé máy bay, tàu hỏa, phương tiện vận chuyển công cộng mua vé theo qui định của các đơn vị vận chuyển.</li>
                                    <li>Trẻ em từ 5 tuổi đến dưới 12 tuổi: 75% giá tour người lớn (không có chế độ giường riêng). Hai người lớn chỉ được kèm 1 trẻ em từ 5 - dưới 12 tuổi, em thứ hai trở lên phải mua 1 suất giường đơn.</li>
                                    <li>Trẻ em từ 12 tuổi trở lên: mua một vé như người lớn</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><h4>Điều kiện thanh toán</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>Khi đăng ký đặt cọc 50% số tiền tour.</li>
                                    <li>Thanh toán hết trước ngày khởi hành 7-10 ngày (tour ngày thường), 20-25 ngày (tour lễ tết).</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><h4>Các điều kiện đăng ký tour</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>Khi đăng ký tour Quý khách vui lòng mang theo CMND/ Hộ chiếu (Passport) bản chính hoặc cung cấp tên chính xác đầy đủ, đúng từng ký tự trên CMND/ Hộ chiếu (Passport)/Giấy khai sinh (trẻ em dưới 14 tuổi) theo thứ tự: Họ/tên lót/tên. Quý khách khi đăng ký cung cấp tên theo giấy tờ tùy thân nào, khi đi tour phải mang theo giấy tờ tùy thân đó theo quy định hãng hàng không</li>
                                    <li>Quy định giấy tờ tùy thân khi đi tour. Đối với Khách Quốc tịch Việt Nam: Khi đi tour Trẻ em từ 14 tuổi trở lên và người lớn cần đem theo CMND/ Hộ chiếu (Passport) bản chính còn hạn sử dụng, hình ảnh rõ /Giấy khai sinh bản chính (trẻ em dưới 14 tuổi), trẻ em trên 14 tuổi bắt buộc phải có CMND hoặc Hộ chiếu (Passport) làm thủ tục lên máy bay. Đối với khách Nước ngoài/Việt Kiều: Khi đi tour phải mang theo đầy đủ Hộ chiếu (Passport) bản chính còn hạn sử dụng hoặc thẻ xanh kèm theo Visa và giấy tái xuất nhập Việt Nam, làm thủ tục lên máy bay theo quy định hàng không.</li>
                                    <li>Trong trường hợp Quý khách cung cấp tên sai, đến trễ giờ bay, vui lòng thanh toán phí đổi vé hoặc mua lại vé mới theo qui định của Hãng Hàng Không (nếu chuyến bay còn chỗ).</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography><h4>Lưu ý khi chuyển/hủy tour</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>Sau khi đóng tiền, nếu Quý khách muốn chuyển/hủy tour xin vui lòng mang Vé Du Lịch đến văn phòng đăng ký tour để làm thủ tục chuyển/hủy tour và chịu mất phí theo quy định của Vietravel. Không giải quyết các trường hợp liên hệ chuyển/hủy tour qua điện thoại.</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><h4>Các điều kiện hủy tour với ngày thường</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>Được chuyển sang các tuyến du lịch khác trước ngày khởi hành 20 ngày : Không mất chi phí.</li>
                                    <li>Nếu hủy hoặc chuyển sang các chuyến du lịch khác ngay sau khi đăng ký đến từ 15-19 ngày trước ngày khởi hành: Chi phí hủy tour: 50% tiền cọc tour.</li>
                                    <li>Nếu hủy hoặc chuyển sang các chuyến du lịch khác từ 12-14 ngày trước ngày khởi hành: Chi phí hủy tour: 100% tiền cọc tour.</li>
                                    <li>Nếu hủy chuyến du lịch trong vòng từ 08-11 ngày trước ngày khởi hành: Chi phí hủy tour: 50% trên giá tour du lịch.</li>
                                    <li>Nếu hủy chuyến du lịch trong vòng từ 05-07 ngày trước ngày khởi hành: Chi phí hủy tour: 70% trên giá tour du lịch.</li>
                                    <li>Nếu hủy chuyến du lịch trong vòng từ 02-04 ngày trước ngày khởi hành: Chi phí hủy tour: 90% trên giá vé du lịch.</li>
                                    <li>Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày khởi hành : Chi phí hủy tour: 100% trên giá vé du lịch.</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><h4>Các điều kiện hủy tour với ngày lễ, Tết</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Áp dụng cho các tour có thời gian diễn ra rơi vào một trong các ngày Lễ, Tết theo qui định
                                <ul>
                                    <li>Được chuyển sang các tuyến du lịch khác trước ngày khởi hành 30 ngày : Không mất chi phí.</li>
                                    <li>Nếu hủy hoặc chuyển sang các chuyến khác ngay sau khi đăng ký đến từ 25-29 ngày trước ngày khởi hành: Chi phí hủy tour: 50% tiền cọc tour.</li>
                                    <li>Nếu hủy hoặc chuyển sang các chuyến khác từ 20-24 ngày trước ngày khởi hành: Chi phí hủy tour: 100% tiền cọc tour.</li>
                                    <li>Nếu hủy chuyến du lịch trong vòng từ 17-19 ngày trước ngày khởi hành: Chi phí hủy tour: 50% trên giá tour du lịch.</li>
                                    <li>Nếu hủy chuyến du lịch trong vòng từ 08-16 ngày trước ngày khởi hành: Chi phí hủy tour: 70% trên giá tour du lịch.</li>
                                    <li>Nếu hủy chuyến du lịch trong vòng từ 02-07 ngày trước ngày khởi hành: Chi phí hủy tour: 90% trên giá vé du lịch.</li>
                                    <li>Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày khởi hành : Chi phí hủy tour: 100% trên giá vé du lịch.</li>
                                </ul>
                                *Các tour Lễ, Tết là tour có thời gian diễn ra rơi vào một trong các ngày Lễ, Tết theo quy định. <br />
                                *Thời gian hủy được tính cho ngày làm việc, không tính thứ 7, Chủ Nhật và các ngày Lễ, Tết.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><h4>Trường hợp bất khả kháng</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nếu chương trình du lịch bị hủy bỏ hoặc thay đổi bởi một trong hai bên vì lý do bất khả kháng (hỏa hoạn, thời tiết, tai nạn, thiên tai, chiến tranh, dịch bệnh, hoãn, dời, và hủy chuyến hoặc thay đổi khác của các phương tiện vận chuyển công cộng hoặc các sự việc bất khả kháng khác theo quy định pháp luật…), thì hai bên sẽ không chịu bất kỳ nghĩa vụ bồi hoàn các tổn thất đã xảy ra và không chịu bất kỳ trách nhiệm pháp lý nào. Tuy nhiên mỗi bên có trách nhiệm cố gắng tối đa để giúp đỡ bên bị thiệt hại nhằm giảm thiểu các tổn thất gây ra vì lý do bất khả kháng.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><h4>Liên hệ</h4></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography style={{ textAlign: 'center' }}>
                                <p><b>Mọi chi tiết vui lòng liên hệ:</b></p>

                                <p><b>KHỐI KHÁCH LẺ - DU LỊCH TRONG NƯỚC</b></p>
                                <p><b>190 PASTEUR, PHƯỜNG VÕ THỊ SÁU, QUẬN 3, TP.HCM</b></p>
                                <p><b>Điện thoại: (84-028) 3822 8898</b></p>
                                <p><b>Tổng đài tư vấn 1900 1839</b></p>
                                <p><b>Hotline: 0938 301 399</b></p>

                                <p><b>VIETRAVEL KÍNH CHÚC QUÝ KHÁCH MỘT CHUYẾN DU LỊCH VUI VẺ</b></p>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );
}
