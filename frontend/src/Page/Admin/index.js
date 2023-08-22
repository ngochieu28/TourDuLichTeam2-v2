import React, { useState, useReducer, useContext } from 'react'
import AppBarAdmin from '../../conponents/AppBar'
import Header from '../../conponents/Navbar'
import LeftMenu from '../../conponents/LeftMenu'
import { initialState } from '../../store/reducer'
import reducer from '../../store/reducer'
import { SET_DATA, SET_LIST } from '../../store/action'
import { AppConsumer } from '../../store'
import { useCheckLogin } from '../../util'
import { Link, Outlet } from 'react-router-dom'


export default function Admin() {
    useCheckLogin();

    // const [state, dispatch] = useReducer(reducer, initialState)
    // console.log(state);

    // const setData = () => {
    //     dispatch(SET_DATA(5000))
    //     dispatch(SET_LIST(["iphone", "samsung", "oppo"]))
    // }

    const [openLeftMenu, setOpenLeftMenu] = useState(false);
    const OpenMenu = (data) => {
        setOpenLeftMenu(data);
    }

    const context = AppConsumer()
    // console.log(context);


    return (
        <div>
            {/* <button onClick={setData}>Click</button>
            <h1>{state.data}</h1>
            {state.list.map(item => {
                return <p key={item}>{item}</p>
            })} */}
            <AppBarAdmin setOpenLeftMenu={setOpenLeftMenu} />
            <LeftMenu openLeftMenu={openLeftMenu} OpenMenu={OpenMenu} />
            <Outlet />
        </div>
    )
}
