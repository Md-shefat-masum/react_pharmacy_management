import React from 'react'

function Sidebar() {
    return (
        <div className="page-sidebar custom-scrollbar">
            <div className="sidebar-user text-center">
                <div>
                    <img className="img-50 rounded-circle" src="../assets/images/user/1.jpg" alt="#"></img>
                </div>
                <h6 className="mt-3 f-12">Johan Deo</h6>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <div className="sidebar-title">General
                        {/* <span className="badge badge-success pull-right">Exclusive</span> */}
                    </div>
                    <a href="page-builder.html" className="sidebar-header">
                        <i className="icon-notepad"></i> 
                        <span>Dasboard</span>
                    </a>
                    <a href="page-builder.html" className="sidebar-header">
                        <i className="icon-notepad"></i> 
                        <span>Orders</span>
                    </a>
                    <a href="page-builder.html" className="sidebar-header">
                        <i className="icon-notepad"></i> 
                        <span>Profile</span>
                    </a>
                </li>
                <li>
                    <div className="sidebar-title">Manage</div>
                    <a href="#/" className="sidebar-header">
                        <i className="icon-desktop"></i>
                        <span>Create Order</span>
                    </a>
                    <a href="#/" className="sidebar-header">
                        <i className="icon-desktop"></i>
                        <span>Upload Prescription</span>
                    </a>
                    <a href="#/" className="sidebar-header">
                        <i className="icon-desktop"></i>
                        <span>Health Sourceing</span>
                    </a>
                </li>

                <li>
                    <div className="sidebar-title">Layout</div>
                    <a href="#/" className="sidebar-header">
                        <i className="icon-palette"></i> <span>Color Version</span>
                        <i className="fa fa-angle-right pull-right"></i>
                    </a>
                    <ul className="sidebar-submenu">
                        <li><a href="layout-light.html"><i className="fa fa-angle-right"></i>Layout Light</a></li>
                        <li><a href="layout-dark.html"><i className="fa fa-angle-right"></i>Layout Dark</a></li>
                    </ul>
                </li>


                <li>
                    <div className="sidebar-title">Builder
                        <span className="badge badge-success pull-right">Exclusive</span>
                    </div>
                    <a href="page-builder.html" className="sidebar-header">
                        <i className="icon-notepad"></i> <span>Page Builder</span>
                    </a>
                </li>

                <li>
                    <a href="maintenance.html" className="sidebar-header">
                        <i className="icon-settings"></i><span> Maintenance</span>
                    </a>
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
