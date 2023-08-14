import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, InputBase } from "@mui/material";
import { Search, AccountCircleOutlined } from "@mui/icons-material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NavbarComponent = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar color="inherit" position="static">
            <Toolbar>
                <img src="https://travel.com.vn/Content/Theme/images/logo.webp" alt="logo" className="mr-2" />

                <Button color="inherit" className="mr-2" onClick={handleMenuOpen}> Du lịch <ArrowDropDownIcon /></Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem>
                        Profile
                    </MenuItem>
                    <MenuItem>
                        Analytics
                    </MenuItem>
                    <MenuItem >Settings & Privacy</MenuItem>
                    <MenuItem>Help</MenuItem>
                    <MenuItem>Sign out</MenuItem>
                </Menu>
                <Button color="inherit" className="mr-2">Vietravel MICE</Button>
                <Button color="inherit" className="mr-2" onClick={handleMenuOpen}>Vận chuyển <ArrowDropDownIcon /></Button>
                <Button color="inherit" className="mr-2" onClick={handleMenuOpen}>Tin tức <ArrowDropDownIcon /></Button>
                <Button color="inherit" className="mr-2" onClick={handleMenuOpen}>Khuyến mãi <ArrowDropDownIcon /></Button>
                <Button color="inherit" className="mr-2">VietravelPlus</Button>
                <Button color="inherit" className="mr-2">Liên hệ</Button>
                <div style={{ marginLeft: 'auto' }}>
                    <span style={{ position: "relative" }}>
                        <InputBase
                            placeholder="Bắt đầu tìm kiếm...."
                            style={{ height: '50px', paddingRight: '30px', border: '2px solid #ffc709' }}
                        />
                        <Search
                            style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}
                        />
                    </span>
                    <AccountCircleOutlined sx={{ ml: 2, fontSize: 32 }} onClick={handleMenuOpen}></AccountCircleOutlined>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavbarComponent;
