import React from 'react'
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <div className="card-header p-0 pb-3">
                <Link to="/dispensary/inventory/drugs" className="btn btn-outline-info btn-sm m-1">All Drugs</Link>
                <Link to="/dispensary/inventory/drugs/create" className="btn btn-outline-info btn-sm m-1">Create New</Link>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout
