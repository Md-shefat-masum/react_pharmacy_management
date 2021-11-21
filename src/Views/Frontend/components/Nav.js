import React from 'react'
import { Link } from 'react-router-dom'
import { UseAuth } from '../../../Hooks/UseAuth'

function Nav() {
    let { log_out, user } = UseAuth();
    return (
        <div>
            <header className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 col-md-2">
                            <div className="logo-wrapper">
                                <a href="#/">
                                    <img src="http://paul-themes.com/html/moonex/assets/img/root/logo-dark.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-9 col-md-8">
                            <div className="topbar-contact">
                                <ul>
                                    <li>
                                        <a href="#/">
                                            <i className="far fa-envelope"></i>
                                            support@learnhunter.com
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tel:+88013423440">
                                            <i className="fas fa-phone"></i>
                                            +88013423440
                                        </a>
                                    </li>
                                    <li>
                                        <p>
                                            <i className="fas fa-map-marker-alt"></i>
                                            West kaprul, bijoy soroni
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="menu">
                                <ul className="d-flex">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/services">Services</Link></li>
                                    <li><Link to="/gallery">Gallery</Link></li>
                                    <li><Link to="/team">Team</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-2">
                            <div className="topbar-social">
                                <ul className="sc-icon-list">
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-behance"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-pinterest-p"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="header-register-btn">
                                <Link to="login">Register Now For Free</Link>
                                {
                                    user?.email?.length &&
                                    <a href="#/" onClick={(e) => { return e.preventDefault && log_out(); }}>Logout</a>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Nav
