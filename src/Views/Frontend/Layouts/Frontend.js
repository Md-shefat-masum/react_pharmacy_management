import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { UseAuth } from '../../../Hooks/UseAuth'
// import Nav from '../components/Nav'

function Frontend() {
    const { user_loged_in } = UseAuth();
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true);
    }, [user_loged_in])

    return (
        <div>
            {
                load &&
                <Outlet />
            }
        </div>
    )
}

export default Frontend
