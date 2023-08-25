/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Card, TextField, InputAdornment } from "@mui/material";
import tourApi from '../../../api/tourApi';
import { srcImg } from '../../../util/srcImg';
import EditableTextField from '../../../conponents/Dialog-TextField-Data';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { toast } from 'react-toastify';
import htmlToDraft from 'html-to-draftjs';
import { format } from 'date-fns';

export default function AddTour() {
    const { maTour } = useParams();
    const [tours, setTours] = useState();
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState('');
    const [tourEdit, setTourEdit] = useState({
        tenTour: "",
        luotQuanTam: "",
        giaTour: "",
        ngayKhoiHanhDate: "",
        thoiGian: "",
        noiKhoiHanh: "",
        soCho: "",
        phuongTienDiChuyen: "",
        diemThamQuan: "",
        amThuc: "",
        khachSan: "",
        thoiGianLyTuong: "",
        doiTuongThichHop: "",
        uuDai: "",
        lichTrinh: ""
    })

    const getTourDetail = async () => {
        try {
            const res = await tourApi.getTourDetailByMaTour(maTour);
            const ngayKhoiHanhDate = format(new Date(res.ngayKhoiHanhDate), 'yyyy-MM-dd');
            setTourEdit({
                tenTour: res.tenTour || "",
                luotQuanTam: res.luotQuanTam || "",
                giaTour: res.giaTour || "",
                ngayKhoiHanhDate: ngayKhoiHanhDate || "",
                thoiGian: res.thoiGian || "",
                noiKhoiHanh: res.noiKhoiHanh || "",
                soCho: res.soCho || "",
                phuongTienDiChuyen: res.phuongTienDiChuyen || "",
                diemThamQuan: res.diemThamQuan || "",
                amThuc: res.amThuc || "",
                khachSan: res.khachSan || "",
                thoiGianLyTuong: res.thoiGianLyTuong || "",
                doiTuongThichHop: res.doiTuongThichHop || "",
                uuDai: res.uuDai || "",
                lichTrinh: res.lichTrinh || "",
            });
            const contentBlock = htmlToDraft(res.lichTrinh);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const newEditorState = EditorState.createWithContent(contentState);
                setEditorState(newEditorState);
            }
        } catch (error) {
            console.log(error);
            toast.error('Gặp lỗi khi gọi Tour!');
            navigate(`/admin/quan-ly-tour`);
        }
    };

    useEffect(() => {
        getTourDetail()
    }, [maTour]);

    const handelApDung = async () => {
        try {
            await tourApi.updateTour(maTour, tourEdit)
            console.log(tourEdit);
            toast.success('Sửa Tour thành công!');
            navigate(`/admin/quan-ly-tour`);
        } catch (error) {
            console.log(error);
            toast.error('Sửa Tour thất bại!');
        }
    }

    const handelReset = () => {
        getTourDetail()
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        setConvertedContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    useEffect(() => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            lichTrinh: convertedContent,
        }));
    }, [convertedContent]);

    const handleSaveTenTour = (editedTenTour) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            tenTour: editedTenTour,
        }));
    };

    const handleSaveLuotQuanTam = (event) => {
        const newValue = event.target.value;
        setTourEdit(prevTourEdit => ({
            ...prevTourEdit,
            luotQuanTam: newValue
        }));
    };

    const handleSaveGiaTour = (event) => {
        const newValue = event.target.value;
        setTourEdit(prevTourEdit => ({
            ...prevTourEdit,
            giaTour: newValue
        }));
    };

    const handleSaveNgayKhoiHanh = (event) => {
        const newValue = event.target.value;
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            ngayKhoiHanhDate: newValue,
        }));
    };

    const handleSaveThoiGian = (editedThoiGian) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            thoiGian: editedThoiGian,
        }));
    };

    const handleSaveNoiKhoiHanh = (editedNoiKhoiHanh) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            noiKhoiHanh: editedNoiKhoiHanh,
        }));
    };

    const handleSaveSoCho = (event) => {
        const newValue = event.target.value;
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            soCho: newValue,
        }));
    };

    const handleSavePhuongTienDiChuyen = (editedPhuongTienDiChuyen) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            phuongTienDiChuyen: editedPhuongTienDiChuyen,
        }));
    };

    const handleSaveDiemThamQuan = (editedDiemThamQuan) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            diemThamQuan: editedDiemThamQuan,
        }));
    };

    const handleSaveAmThuc = (editedAmThuc) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            amThuc: editedAmThuc,
        }));
    };

    const handleSaveKhachSan = (editedKhachSan) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            khachSan: editedKhachSan,
        }));
    };

    const handleSaveThoiGianLyTuong = (editedThoiGianLyTuong) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            thoiGianLyTuong: editedThoiGianLyTuong,
        }));
    };

    const handleSaveDoiTuongThichHop = (editedDoiTuongThichHop) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            doiTuongThichHop: editedDoiTuongThichHop,
        }));
    };

    const handleSaveUuDai = (editedUuDai) => {
        setTourEdit((prevTourEdit) => ({
            ...prevTourEdit,
            uuDai: editedUuDai,
        }));
    };

    return (
        <>
            <div className='tour-detail'>
                <Container>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#4d4aef' }}>
                        <ConfirmationNumberOutlinedIcon style={{ fontSize: '14px' }} />
                        <p style={{ fontSize: '14px', marginLeft: '5px' }}></p>
                    </div>
                    <Grid container>
                        <Grid item xs='6'>
                            <h2 style={{ margin: '0', color: '#2d4271' }}>
                                <EditableTextField label="Tên Tour" value={tourEdit.tenTour} onSave={handleSaveTenTour} />
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ThumbUpOutlinedIcon style={{ fontSize: '50px', margin: '10px' }} />
                                <div >
                                    <p>Tuyệt vời</p>
                                    <TextField
                                        label={"Lượt Quan Tâm"}
                                        value={tourEdit.luotQuanTam}
                                        onChange={handleSaveLuotQuanTam}
                                        variant="standard"
                                        type={"number"}
                                        inputProps={{ min: 0 }}
                                    />
                                </div>
                                <Button style={{ padding: '10px', fontSize: '25px' }}><FavoriteOutlinedIcon style={{ color: 'red', fontSize: '35px' }} />126</Button>
                            </div>
                        </Grid>
                        <Grid item xs='6'>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs='8'>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <h2 style={{ margin: '0', color: 'red' }}>
                                            <TextField
                                                label={"Giá Tour"}
                                                value={tourEdit.giaTour}
                                                onChange={handleSaveGiaTour}
                                                variant="standard"
                                                type={"number"}
                                                inputProps={{ min: 0 }}
                                            />
                                        </h2>

                                        <div style={{ marginLeft: '10px' }}>
                                            <Button variant="contained" color="error" startIcon={<AddShoppingCartIcon />} style={{ height: '50px', width: '100%', margin: '5px' }}>
                                                Đặt ngay
                                            </Button><br />
                                            <Button variant="outlined" color='inherit' style={{ height: '50px', width: '100%', margin: '5px' }}>Liên hệ tư vấn</Button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={7} >
                            <img
                                src={`${srcImg}/${tours?.image}`}
                                style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                alt="Image 1"
                            />
                        </Grid>
                        <Grid item xs={5} >
                            <Grid container spacing={1} >
                                <Grid item xs={6} >
                                    <img
                                        src={`${srcImg}/${tours?.image2}`}
                                        style={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 2"
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <img
                                        src={`${srcImg}/${tours?.image3}`}
                                        style={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 3"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={12} >
                                    <img
                                        src={`${srcImg}/${tours?.image4}`}
                                        style={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                        alt="Image 4"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} style={{ margin: '0' }}>
                        <Grid item xs='5'>
                            <div style={{ backgroundColor: 'white', marginBottom: '20px', borderRadius: '10px', padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ marginRight: '1rem' }}>Ngày khởi hành: </p>
                                    <TextField
                                        value={tourEdit.ngayKhoiHanhDate}
                                        onChange={handleSaveNgayKhoiHanh}
                                        variant="standard"
                                        type={"date"}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <EditableTextField label="Thời Gian" value={tourEdit.thoiGian} onSave={handleSaveThoiGian} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <EditableTextField label="Nơi Khởi Hành" value={tourEdit.noiKhoiHanh} onSave={handleSaveNoiKhoiHanh} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        fullWidth
                                        label={"Số Chỗ"}
                                        value={tourEdit.soCho}
                                        onChange={handleSaveSoCho}
                                        variant="standard"
                                        type={"number"}
                                        inputProps={{ min: 0 }}
                                    />

                                </div>
                            </div>
                            <div>
                                <p>Quý khách cần hỗ trợ?</p>
                                <Button variant="contained" startIcon={<LocalPhoneOutlinedIcon />} style={{ height: '50px', margin: '5px' }}>
                                    Gọi điện miễn phí
                                </Button>
                                <Button variant="outlined" color='inherit' style={{ height: '50px', margin: '5px' }}>Gửi yêu cầu hỗ trợ</Button>
                            </div>
                        </Grid>
                        <Grid item xs='7'>
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <EmojiFlagsIcon />
                                    <p className='title-tour'>Thời gian</p>
                                    <EditableTextField label="Thời Gian" value={tourEdit.thoiGian} onSave={handleSaveThoiGian} />
                                </Grid>
                                <Grid item xs={3}>
                                    <DirectionsCarFilledOutlinedIcon />
                                    <p className='title-tour'>Phương tiện</p>
                                    <EditableTextField label="Phương Tiện Di Chuyển" value={tourEdit.phuongTienDiChuyen} onSave={handleSavePhuongTienDiChuyen} />
                                </Grid>
                                <Grid item xs={3}>
                                    <MapOutlinedIcon />
                                    <p className='title-tour'>Địa điểm tham quan</p>
                                    <EditableTextField label="Điểm Tham Quan" value={tourEdit.diemThamQuan} onSave={handleSaveDiemThamQuan} />
                                </Grid>
                                <Grid item xs={3}>
                                    <RestaurantOutlinedIcon />
                                    <p className='title-tour'>Ẩm thực</p>
                                    <EditableTextField label="Ẩm Thực" value={tourEdit.amThuc} onSave={handleSaveAmThuc} />
                                </Grid>
                                <Grid item xs={3}>
                                    <HomeWorkOutlinedIcon />
                                    <p className='title-tour'>Khách sạn</p>
                                    <EditableTextField label="Khách Sạn" value={tourEdit.khachSan} onSave={handleSaveKhachSan} />
                                </Grid>
                                <Grid item xs={3}>
                                    <AccessTimeOutlinedIcon />
                                    <p className='title-tour'>Thời gian lý tưởng</p>
                                    <EditableTextField label="Thời Gian Lý Tưởng" value={tourEdit.thoiGianLyTuong} onSave={handleSaveThoiGianLyTuong} />
                                </Grid>
                                <Grid item xs={3}>
                                    <GroupsOutlinedIcon />
                                    <p className='title-tour'>Đối tượng thích hợp</p>
                                    <EditableTextField label="Đối Tượng Thích Hợp" value={tourEdit.doiTuongThichHop} onSave={handleSaveDoiTuongThichHop} />
                                </Grid>
                                <Grid item xs={3}>
                                    <LocalActivityOutlinedIcon />
                                    <p className='title-tour'>Ưu đãi</p>
                                    <EditableTextField label="Ưu Đãi" value={tourEdit.uuDai} onSave={handleSaveUuDai} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container>
                <div >
                    <Card variant="outlined" className='lich-trinh-tour'>
                        <h2 style={{ textAlign: 'center' }}>Lịch trình</h2>
                        <div>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                            />
                        </div>
                    </Card>
                </div>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="contained" style={{ margin: '5px' }} onClick={handelReset}>
                        Reset
                    </Button>
                    <Button variant="contained" style={{ margin: '5px' }} onClick={handelApDung}>
                        Áp dụng
                    </Button>
                    <Button variant="outlined" color='inherit' style={{ margin: '5px' }}><Link to={'/admin/quan-ly-tour'}>Hủy</Link></Button>
                </div>
            </Container >
        </>
    )
}

