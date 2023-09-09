import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { AccountCircleOutlined } from "@mui/icons-material";
import { AppConsumer } from '../store';
import { useNavigate } from 'react-router-dom';

const pages = ['Du lịch', 'Vietravel MICE', 'Vận chuyển', 'Tin tức', 'Khuyến mãi ', 'Vietravel Plus', 'Liên hệ'];
const settings = ['Profile', 'Account', 'Logout'];

function ResponsiveAppBar() {
    const [state, dispatch] = AppConsumer();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const showInfoUser = () => {
        if (!state.userInfo.firstName || !state.userInfo.lastName) {
            alert("Bạn chưa đăng nhập ! Hãy đăng nhập tài khoản");
            navigate('/login');
            return;
        }
        else {
            alert("Xin chào " + state.userInfo.firstName + " " + state.userInfo.lastName);
        }
    }
    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff' }}>
            <Toolbar >
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none"
                    }}
                >
                    <Link to="/"><img src="https://travel.com.vn/Content/Theme/images/logo.webp" alt="logo" className="mr-2" /></Link>
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none", color: "rgb(45, 66, 113)" } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="rgb(45, 66, 113)"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", md: "none" }
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu} >
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none"
                    }}
                >
                    <Link to="/"><img src="https://travel.com.vn/Content/Theme/images/logo.webp" alt="logo" className="mr-2" style={{ width: '100%', objectFit: 'cover' }} /></Link>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "rgb(45, 66, 113)", display: "block" }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <AccountCircleOutlined sx={{ ml: 2, fontSize: 32 }} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {/* {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))} */}
                        <MenuItem onClick={showInfoUser}>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography textAlign="center">Account</Typography>
                        </MenuItem>
                        <Link to={'/login'} >
                            <MenuItem>
                                <Typography textAlign="center">LogOut</Typography>
                            </MenuItem>
                        </Link>
                    </Menu>
                </Box>
            </Toolbar>

        </AppBar>
    );
}
export default ResponsiveAppBar;
