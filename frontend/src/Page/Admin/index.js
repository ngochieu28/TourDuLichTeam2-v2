import React, { useState, useReducer, useContext, useEffect } from 'react'
import HeaderAdmin from '../../conponents/HeaderAdmin'
import Header from '../../conponents/Navbar'
import LeftMenu from '../../conponents/LeftMenu'
import { initialState } from '../../store/reducer'
import reducer from '../../store/reducer'
import { SET_DATA, SET_LIST } from '../../store/action'
import { AppConsumer } from '../../store'
import { useCheckAdmin } from '../../util/CheckLogin'
import { Link, Outlet } from 'react-router-dom'

export default function Admin() {
    useCheckAdmin();

    const [openLeftMenu, setOpenLeftMenu] = useState(false);
    const OpenMenu = (data) => {
        setOpenLeftMenu(data);
    }
    const context = AppConsumer()

    return (
        <div>
            <HeaderAdmin setOpenLeftMenu={setOpenLeftMenu} />
            <LeftMenu openLeftMenu={openLeftMenu} OpenMenu={OpenMenu} />
            <Outlet />
        </div>
    )
}
