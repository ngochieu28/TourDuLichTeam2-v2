import React, { createContext, useContext, useReducer } from 'react'
import reducer, { initialState } from './reducer';

const AppConText = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppConText.Provider value={[state, dispatch]}>
            {children}
        </AppConText.Provider>
    )
}

export const AppConsumer = () => useContext(AppConText)

export default AppProvider
