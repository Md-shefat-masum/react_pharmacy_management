import React from 'react'
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <div className="card-header p-0 pb-1">
                <Link to="/dispensary/inventory/suppliers" className="btn btn-outline-info btn-sm m-1">All Supplier</Link>
                <Link to="/dispensary/inventory/suppliers/create" className="btn btn-outline-info btn-sm m-1">Create Supplier</Link>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout
