import React from 'react'
import { Link } from 'react-router-dom';
import { UseAuth } from '../../../Hooks/UseAuth'

function HeaderUser() {
    let { user, log_out } = UseAuth();
    return (
        <div>
            <div className="d-flex align-items-center">
                {
                    user?.photoURL ?

                        <img className="align-self-center pull-right flex-shrink-0 me-2"
                            src={user.photoURL} style={{height:20}} alt="header-user" />
                        :

                        <img className="align-self-center pull-right flex-shrink-0 me-2"
                            src="../assets/images/dashboard/user.png" alt="header-user" />
                }
                <div>
                    <h6 className="m-0 txt-dark f-16">
                        My Account
                        <i className="fa fa-angle-down pull-right ms-2"></i>
                    </h6>
                </div>
            </div>
            <ul className="profile-dropdown onhover-show-div p-20">
                <li>
                    <Link to="/consumer/profile">
                        <i className="icon-user"></i>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="#/" onClick={()=>log_out()}>
                        <i className="icon-power-off"></i>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default HeaderUser
