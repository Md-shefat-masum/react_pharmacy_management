import React from 'react'
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <div className="card-header p-0 pb-1">
                <Link to="/dispensary/inventory/categories" className="btn btn-outline-info btn-sm m-1">All Categories</Link>
                <Link to="/dispensary/inventory/categories/create" className="btn btn-outline-info btn-sm m-1">Create Category</Link>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout
