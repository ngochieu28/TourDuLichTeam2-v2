import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AppConsumer } from '../store';
import { CLOSE_MENU } from '../store/action';
import { Link as LinkRouter } from 'react-router-dom';
import { useCheckAdmin } from '../util/CheckLogin';


export default function LeftMenu({ openLeftMenu, OpenMenu }) {
    useCheckAdmin();
    const [state, dispatch] = AppConsumer();
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        dispatch(CLOSE_MENU(false))
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <LinkRouter to="/admin">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                Admin
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>
                </LinkRouter>

                {/* <LinkRouter to="product">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                Product
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>
                </LinkRouter> */}

                <LinkRouter to="quan-ly-tour">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                Quản lý tour
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>
                </LinkRouter>

                <LinkRouter to="quan-ly-booking">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                Quản lý Booking
                            </ListItemIcon>
                            <ListItemText />
                        </ListItemButton>
                    </ListItem>
                </LinkRouter>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <Drawer
                    anchor={"left"}
                    open={state.toggleMenu}
                    onClose={toggleDrawer("left", false)}
                >
                    {list("left")}
                </Drawer>
            </React.Fragment>

        </div>
    );
}