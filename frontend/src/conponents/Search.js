import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography, InputBase, Button } from "@mui/material";
import { Search, RestartAlt } from "@mui/icons-material";
import { AppConsumer } from '../store';
import { SET_SEARCHDIEMDEN, SET_SEARCHNOIKHOIHANH, SET_SEARCHTHOIGIAN } from '../store/action'

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [state, dispatch] = AppConsumer();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [noiKhoiHanh, setNoiKhoiHanh] = React.useState('');
    const [diemDen, setDiemDen] = React.useState('');
    const [thoiGian, setThoiGian] = React.useState('');

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tour du lịch trọn gói" {...a11yProps(0)} />
                    <Tab label="Khách sạn" {...a11yProps(1)} />
                    <Tab label="Vé máy bay" {...a11yProps(2)} />
                    <Tab label="Combo vé máy bay + Khách sạn" {...a11yProps(3)} />
                    <Tab label="Combo xe + khách sạn" {...a11yProps(4)} />
                    <Tab label="Tra cứu Booking" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div>
                    <form
                        className="ml-auto position-relative"
                        onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(SET_SEARCHNOIKHOIHANH(noiKhoiHanh))
                            dispatch(SET_SEARCHDIEMDEN(diemDen))
                            dispatch(SET_SEARCHTHOIGIAN(thoiGian))

                        }}
                    >
                        <div className="mr-2" style={{ display: 'inline-block' }}>
                            <Box inline className="ml-auto position-relative">
                                <div className="position-relative" style={{ display: 'inline-block' }}>
                                    <InputBase
                                        placeholder="Điểm đi...."
                                        style={{ height: '50px', paddingRight: '30px', border: '2px solid #ffc709' }}
                                        value={noiKhoiHanh}
                                        onChange={(e) => setNoiKhoiHanh(e.target.value)}
                                    />
                                </div>
                            </Box>
                        </div>
                        <div className="mr-2" style={{ display: 'inline-block' }}>
                            <Box inline className="ml-auto position-relative">
                                <div className="position-relative" style={{ display: 'inline-block' }}>
                                    <InputBase
                                        placeholder="Điểm đến...."
                                        style={{ height: '50px', paddingRight: '30px', border: '2px solid #ffc709' }}
                                        value={diemDen}
                                        onChange={(e) => setDiemDen(e.target.value)}
                                    />
                                </div>
                            </Box>
                        </div>
                        <div className="mr-2" style={{ display: 'inline-block' }}>
                            <Box inline className="ml-auto position-relative">
                                <div className="position-relative" style={{ display: 'inline-block' }}>
                                    <InputBase
                                        type='number'
                                        placeholder="Số ngày...."
                                        style={{ height: '50px', paddingRight: '30px', border: '2px solid #ffc709' }}
                                        value={thoiGian}
                                        onChange={(e) => setThoiGian(e.target.value)}
                                    />
                                </div>
                            </Box>
                        </div>
                        <div className="mr-2" style={{ display: 'inline-block' }}>
                            <Button type='submit' style={{ background: 'linear-gradient(64.4deg, #244c7a 21.33%, #002f65 67.61%)', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', color: 'yellow', height: '50px' }}>
                                <Search />
                            </Button>
                        </div>
                        <div className="mr-2" style={{ display: 'inline-block' }}>
                            <Button style={{ background: 'linear-gradient(64.4deg, #244c7a 21.33%, #002f65 67.61%)', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', color: 'yellow', height: '50px' }} onClick={() => {
                                setNoiKhoiHanh('')
                                setDiemDen('')
                                setThoiGian('')
                                dispatch(SET_SEARCHNOIKHOIHANH(''))
                                dispatch(SET_SEARCHDIEMDEN(''))
                                dispatch(SET_SEARCHTHOIGIAN(''))
                            }}>
                                <RestartAlt />
                            </Button>
                        </div>
                    </form>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <h4>Có điều kiện sẽ phát triển sau</h4>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <h4>Có điều kiện sẽ phát triển sau</h4>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <h4>Có điều kiện sẽ phát triển sau</h4>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <h4>Có điều kiện sẽ phát triển sau</h4>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <h4>Đây là phần tra cứu Booking</h4>
            </CustomTabPanel>
        </Box>
    );
}