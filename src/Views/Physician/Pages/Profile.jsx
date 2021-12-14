import React from 'react'
import { UseAuth } from '../../../Hooks/UseAuth'
import UpdateProfileInformation from '../../Components/Shared/UpdateProfileInformation';
import UpdateProfilePic from '../../Components/Shared/UpdateProfilePic';

function Profile() {
    let { user } = UseAuth();
    return (
        <div className="user-profile">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card hovercard text-center">
                        <div className="cardheader" style={{ height: 240 }}></div>
                        <UpdateProfilePic></UpdateProfilePic>
                        <div className="info">
                            <div className="row">
                                <div className="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="ttl-info text-start">
                                                <h6><i className="fa fa-envelope"></i>&nbsp;&nbsp;&nbsp;Email</h6>
                                                <span>{user.email}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="ttl-info text-start">
                                                <h6><i className="fa fa-calendar"></i>&nbsp;&nbsp;&nbsp;BOD</h6>
                                                <span>{user.dob}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                                    <div className="user-designation">
                                        <div className="title">
                                            <a target="_blank" href="#/">{user.displayName}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="ttl-info text-start">
                                                <h6><i className="fa fa-phone"></i>&nbsp;&nbsp;&nbsp;Contact Us</h6>
                                                <span>{user.contact_number}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="ttl-info text-start">
                                                <h6><i className="fa fa-location-arrow"></i>&nbsp;&nbsp;&nbsp;Location</h6>
                                                <span className="text-capitalize">
                                                    {user.street}, &nbsp;
                                                    {user.city}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <UpdateProfileInformation></UpdateProfileInformation>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
