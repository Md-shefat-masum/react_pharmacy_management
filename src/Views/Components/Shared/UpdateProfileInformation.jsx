import axios from 'axios';
import React from 'react'
import { UseAuth } from '../../../Hooks/UseAuth'
import { UseCommonData } from '../../../Hooks/UseCommonData'

function UpdateProfileInformation() {
    const { user, formErrors } = UseAuth();
    const { calert } = UseCommonData();

    const handleUpdate = (e) => {
        e.preventDefault();
        let form_data = new FormData(e.target);
        axios.post(`${process.env.REACT_APP_API_LINK}/user/update-profile`, form_data)
            .then(res => {
                console.log(res);
                calert(true,'profile information updated successfully','light')
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    return (
        <form action="" onSubmit={(e) => handleUpdate(e)} className="theme-form">
            <div className="card-header">
                <h5>Update Information</h5>
            </div>
            <div className="card-body">
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">First Name</label>
                    <div className="col-sm-9">
                        <input type="text" name="first_name" defaultValue={user.first_name} className="form-control" placeholder="First Name" />
                        {
                            formErrors?.first_name?.length > 0 &&
                            <span className="text-danger mt-1">{formErrors.first_name}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Last Name</label>
                    <div className="col-sm-9">
                        <input type="text" name="last_name" defaultValue={user.last_name} className="form-control" placeholder="Last Name" />
                        {
                            formErrors?.last_name?.length > 0 &&
                            <span className="text-danger mt-1">{formErrors.last_name}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Contact Number</label>
                    <div className="col-sm-9">
                        <input type="text" name="contact_number" defaultValue={user.contact_number} className="form-control" placeholder="contact number" />
                        {
                            formErrors?.contact_number?.length > 0 &&
                            <span className="text-danger mt-1">{formErrors.contact_number}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Street</label>
                    <div className="col-sm-9">
                        <input type="text" name="street" defaultValue={user.street} className="form-control" placeholder="City" />
                        {
                            formErrors?.street?.length > 0 &&
                            <span className="text-danger mt-1">{formErrors.street}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">City</label>
                    <div className="col-sm-9">
                        <input type="text" name="city" defaultValue={user.city} className="form-control" placeholder="City" />
                        {
                            formErrors?.city?.length > 0 &&
                            <span className="text-danger mt-1">{formErrors.city}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Zip Code</label>
                    <div className="col-sm-9">
                        <input type="text" name="zip_code" defaultValue={user.zip_code} className="form-control" placeholder="zip code" />
                        {
                            formErrors?.zip_code?.length > 0 &&
                            <span className="text-danger mt-1">{formErrors.zip_code}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Country</label>
                    <div className="col-sm-9">
                        <input type="text" name="country" defaultValue={user.country} className="form-control" placeholder="zip code" />
                        {
                            formErrors?.country?.length > 0 &&
                            <span className="text-danger mt-1">{formErrors.country}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="" className="col-sm-3 col-form-label">State</label>
                    <div className="col-sm-9">
                        <input type="text" name="state" defaultValue={user.state} className="form-control" placeholder="State" />
                        {
                            formErrors?.state?.length > 0 &&
                            <span className="text-danger mt-1">{formErrors.state}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-9">
                        <input type="password" name="password" className="form-control" placeholder="Password" />
                        {
                            formErrors?.password?.length > 0 &&
                            <span className="text-danger mt-1">{formErrors.password}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Confirm Password</label>
                    <div className="col-sm-9">
                        <input type="password" name="password_confirmation" className="form-control" placeholder="Confirm Password" />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary">Submit</button>
            </div>
            
        </form>
    )
}

export default UpdateProfileInformation
