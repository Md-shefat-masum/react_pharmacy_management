import React, { createContext, useEffect, useState } from 'react'

export const CommonContext = createContext(null);

function CommonProvider({ children }) {
    const [ShowNavbar, setShowNavbar] = useState(true);
    const [ShowHeaderNavbar, setShowHeaderNavbar] = useState(true);
    const [DashCalenderDate, setDashCalenderDate] = useState('');
    useEffect(() => {
        let window_width = window.innerWidth;
        if(window_width < 992){
            setShowNavbar(false);
        }
    }, [])
    const allContexts = {
        logo: 'tlogo.png',
        name: 'good green',

        show_nav_bar: ShowNavbar,
        set_show_nav_bar: setShowNavbar,

        show_header_nav_bar: ShowHeaderNavbar,
        set_header_show_nav_bar: setShowHeaderNavbar,

        dash_calender_date: DashCalenderDate,
        set_dash_calender_date: setDashCalenderDate,
    };
    return (
        <CommonContext.Provider value={allContexts}>
            {children}
        </CommonContext.Provider>
    )
}

export default CommonProvider
