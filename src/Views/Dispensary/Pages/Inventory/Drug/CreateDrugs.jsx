import axios from 'axios';
import React from 'react'
// import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../../../../Hooks/UseAuth';
import { UseCommonData } from '../../../../../Hooks/UseCommonData'

function CreateDrugs() {
    const { calert } = UseCommonData();
    const { formErrors } = UseAuth();

    const formHandler = (e) => {
        e.preventDefault();
        let form_data = new FormData(e.target);
        axios.post(`${process.env.REACT_APP_API_LINK}/inventory/supplier/create`, form_data)
            .then(() => {
                e.target.reset();
                calert(true, 'Supplier created successfully.', 'light', 4000);
            })
            .catch((error) => {
                let message = error?.response?.data?.err_message;
                calert(true, message || 'something is wrong try again..', 'warning', 4000);
            })
    }

    return (
        <div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-9">
                    <div className="card shadow-0 border-1 border">
                        <div className="card-header">
                            <h4> Create Supplier</h4>
                        </div>
                        <div className="card-body">

                            <form action="" onSubmit={(e) => formHandler(e)}>
                                <div className="form-group">
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Supplier Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="supplier_name" className="form-control" placeholder="Supplier name" />
                                            {
                                                formErrors?.supplier_name?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.supplier_name}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Company Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="company_name" className="form-control" placeholder="Company name" />
                                            {
                                                formErrors?.company_name?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.company_name}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Contact Number :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="contact_number" className="form-control" placeholder="Contact Number" />
                                            {
                                                formErrors?.contact_number?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.contact_number}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Email :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="email" className="form-control" placeholder="Email" />
                                            {
                                                formErrors?.email?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.email}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Address :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="address" className="form-control" placeholder="Address" />
                                            {
                                                formErrors?.address?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.address}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">City :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="city" className="form-control" placeholder="City" />
                                            {
                                                formErrors?.city?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.city}</span>
                                            }
                                        </div>
                                    </div>

                                    <div className="form-group text-center">
                                        <button className="btn btn-outline-success-2x">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateDrugs
