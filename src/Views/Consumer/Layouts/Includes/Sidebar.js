import React from 'react'
import { Link } from 'react-router-dom'
import SidebarUser from '../../../Components/Shared/SidebarUser'

function Sidebar() {
    return (
        <div className="page-sidebar custom-scrollbar page-sidebar-open">
            <SidebarUser></SidebarUser>
            <ul className="sidebar-menu">
                <li>
                    <div className="sidebar-title">General
                        {/* <span className="badge badge-success pull-right">Exclusive</span> */}
                    </div>
                    <Link to="/consumer" className="sidebar-header">
                        <i className="icon-notepad"></i>
                        <span>Dasboard</span>
                    </Link>
                    <Link to="/consumer/orders" className="sidebar-header">
                        <i className="icon-gift"></i>
                        <span>Orders</span>
                    </Link>
                    <Link to="/consumer/payment-requests" className="sidebar-header">
                        <i className="icon-money"></i>
                        <span>Payment Request</span>
                    </Link>
                    <Link to="/consumer/profile" className="sidebar-header">
                        <i className="icon-user"></i>
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <div className="sidebar-title">Manage</div>
                    <Link to="/consumer/create-order" className="sidebar-header">
                        <i className="icon-shopping-cart-full"></i>
                        <span>Create Order</span>
                    </Link>
                    <Link to="/consumer/upload-prescription" className="sidebar-header">
                        <i className="icon-shopping-cart"></i>
                        <span>Upload Prescription</span>
                    </Link>
                    <Link to="/consumer/health-searching" className="sidebar-header">
                        <i className="icon-bookmark-alt"></i>
                        <span>Health Sourceing</span>
                    </Link>
                </li>

            </ul>
            <div className="sidebar-widget text-center">
                <div className="sidebar-widget-top">
                    <h6 className="mb-2 fs-14">Contact</h6>
                    <i className="icon-bell"></i>
                </div>
                <div className="sidebar-widget-bottom p-20 m-20">
                    <p>
                        <span>+1 234 567 899</span>
                        <br />support@gg.com
                        <br /><a href="#/">Visit FAQ</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
