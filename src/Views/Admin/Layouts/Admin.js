import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from './Includes/Header'
import Sidebar from './Includes/Sidebar'

export default function Admin() {
    return (
        <div className="page-wrapper">
            <Header></Header>
            <div className="page-body-wrapper">
                <Sidebar></Sidebar>
            
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h3>Sample Page
                                        {/* <small>Universal Admin panel</small> */}
                                    </h3>
                                </div>
                                <div className="col-lg-6">
                                    <ol className="breadcrumb pull-right">
                                        <li className="breadcrumb-item">
                                            <a href="#/">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item active">Sample Page</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/orders">Orders</Link>
            <Link to="/dashboard/products">Products</Link>
            <Link to="/">Home</Link>
            <Outlet />
        </div>
    )
}
