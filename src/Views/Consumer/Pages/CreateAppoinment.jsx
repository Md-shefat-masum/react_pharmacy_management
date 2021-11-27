import React from 'react'
import { Link } from 'react-router-dom';
import { UseAuth } from '../../../Hooks/UseAuth'

function CreateAppoinment() {
    const {user} = UseAuth();
    return (
        <div>
            <div className="user-profile">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card hovercard text-center">
                            <div className="info">

                                <form action="" className="theme-form">
                                    <div className="card-header">
                                        <h5>Create Appoinment</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3 row">
                                            <label for="" className="col-sm-3 col-form-label">First Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" defaultValue={user.displayName} className="form-control" id="" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="" className="col-sm-3 col-form-label">Last Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" defaultValue={user.displayName} className="form-control" id="" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="" className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <input type="email" defaultValue={user.email} className="form-control" id="" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="" className="col-sm-3 col-form-label">Date</label>
                                            <div className="col-sm-9">
                                                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="form-control" id="" placeholder="contact number" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="" className="col-sm-3 col-form-label">Time</label>
                                            <div className="col-sm-9">
                                                <input type="time" className="form-control" id="" placeholder="City" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="" className="col-sm-3 col-form-label">Zip Code</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="" placeholder="zip code" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="" className="col-sm-3 col-form-label">State</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="" placeholder="State" />
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="card-footer">
                                        <Link to="/consumer/appoinments" className="btn btn-primary">Submit</Link>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAppoinment
