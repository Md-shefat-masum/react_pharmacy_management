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
                    <Link to="/physician" className="sidebar-header">
                        <i className="icon-notepad"></i> 
                        <span>Dasboard</span>
                    </Link>
                    {/* <Link to="/physician/create-prescription" className="sidebar-header">
                        <i className="icon-shield"></i> 
                        <span>Create Prescription</span>
                    </Link> */}
                    <Link to="/physician/appoinments" className="sidebar-header">
                        <i className="icon-shield"></i> 
                        <span>Appoinments</span>
                    </Link>
                    <Link to="/physician/profile" className="sidebar-header">
                        <i className="icon-user"></i> 
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <div className="sidebar-title">Manage</div>
                    <Link to="/physician/prescriptions" className="sidebar-header">
                        <i className="icon-notepad"></i>
                        <span>Prescriptions</span>
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
