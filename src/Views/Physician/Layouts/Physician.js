import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { UseAuth } from '../../../Hooks/UseAuth';
import { UseCommonData } from '../../../Hooks/UseCommonData';
import Header from './Includes/Header'
import Sidebar from './Includes/Sidebar'

export default function Admin() {
    const { show_nav_bar } = UseCommonData();
    const { user, navigate_to } = UseAuth();
    
    useEffect(() => {
        parseInt(user.role_serial) !== 3 && navigate_to()
    }, [])

    return parseInt(user.role_serial) === 3 &&(
        <div className="page-wrapper">
            <Header></Header>
            <div className={show_nav_bar?`page-body-wrapper`:`page-body-wrapper sidebar-close`}>
                <Sidebar></Sidebar>
            
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h3>
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
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
