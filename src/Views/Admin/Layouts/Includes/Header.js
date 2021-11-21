import React from 'react'

function Header() {
    return (
        <div className="page-main-header">
            <div className="main-header-left">
                <div className="logo-wrapper">
                    <a href="index.html">
                        <img src="/tlogo.png" className="image-dark" alt="site-logo" />
                        <img src="/tlogo.png" className="image-light" alt="" />
                    </a>
                </div>
            </div>
            <div className="main-header-right row">
                <div className="mobile-sidebar col-1 ps-0">
                    <div className="text-start switch-sm">
                        <label className="switch">
                            <input type="checkbox" id="sidebar-toggle" ></input>
                            <span className="switch-state"></span>
                        </label>
                    </div>
                </div>
                <div className="nav-right col">
                    <ul className="nav-menus">
                    
                        <li className="onhover-dropdown">
                            <a href="#!" className="txt-dark">
                                <img className="align-self-center pull-right me-2" src="../assets/images/dashboard/notification.png" alt="header-notification"></img>
                                <span className="badge rounded-pill badge-primary notification">3</span>
                            </a>
                            <ul className="notification-dropdown onhover-show-div">
                                <li>Notification <span className="badge rounded-pill badge-secondary text-white text-uppercase pull-right">3 New</span></li>
                                <li>
                                    <div className="d-flex">
                                        <i className="flex-shrink-0 align-self-center notification-icon icofont icofont-shopping-cart bg-primary"></i>
                                        <div>
                                            <h6 className="mt-0">Your order ready for Ship..!</h6>
                                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                            <span><i className="icofont icofont-clock-time p-r-5"></i>Just Now</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <i className="flex-shrink-0 align-self-center notification-icon icofont icofont-download-alt bg-success"></i>
                                        <div>
                                            <h6 className="mt-0 txt-success">Download Complete</h6>
                                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                            <span><i className="icofont icofont-clock-time p-r-5"></i>5 minutes ago</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <i className="flex-shrink-0 align-self-center notification-icon icofont icofont-recycle bg-danger"></i>
                                        <div>
                                            <h6 className="mt-0 txt-danger">250 MB trush files</h6>
                                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                            <span><i className="icofont icofont-clock-time p-r-5"></i>25 minutes ago</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="text-center">You have Check <a href="#/">all</a> notification  </li>
                            </ul>
                        </li>

                        <li className="onhover-dropdown">
                            <div className="d-flex align-items-center">
                                <img className="align-self-center pull-right flex-shrink-0 me-2" src="../assets/images/dashboard/user.png" alt="header-user" />
                                <div>
                                    <h6 className="m-0 txt-dark f-16">
                                        My Account
                                        <i className="fa fa-angle-down pull-right ms-2"></i>
                                    </h6>
                                </div>
                            </div>
                            <ul className="profile-dropdown onhover-show-div p-20">
                                <li>
                                    <a href="#/">
                                        <i className="icon-user"></i>
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="#/">
                                        <i className="icon-power-off"></i>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-lg-none mobile-toggle">
                        <i className="icon-more"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
