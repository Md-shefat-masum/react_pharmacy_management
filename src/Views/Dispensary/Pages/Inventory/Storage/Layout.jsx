import React from 'react'
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <div className="card-header p-0 pb-1">
                <Link to="/dispensary/inventory/storages" className="btn btn-outline-info btn-sm m-1">All Storage</Link>
                <Link to="/dispensary/inventory/storages/create" className="btn btn-outline-info btn-sm m-1">Create Storage</Link>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout
