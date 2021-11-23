import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UseAuth } from '../../../../../Hooks/UseAuth';
import { UseCommonData } from '../../../../../Hooks/UseCommonData'

function EditSupplier() {
    const { calert } = UseCommonData();
    const { formErrors } = UseAuth();
    const params = useParams();
    const [drugCategory, setDrugCategory] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/inventory/supplier/get/${params.id}`)
            .then(res => {
                setDrugCategory(res.data);
            })
        return () => {
            setDrugCategory({})
        }
    }, [])
    const formHandler = (e) => {
        e.preventDefault();
        let form_data = new FormData(e.target);
        form_data.append('id', drugCategory.id);

        axios.post(`${process.env.REACT_APP_API_LINK}/inventory/supplier/update`, form_data)
            .then(() => {
                // e.target.reset();
                calert(true, 'Manufaturer updated successfully.', 'light', 4000);
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
                            <h4> Update Supplier</h4>
                        </div>
                        <div className="card-body">

                            <form action="" onSubmit={(e) => formHandler(e)}>
                                <div className="form-group">
                                    
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Supplier Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={drugCategory.supplier_name} name="supplier_name" className="form-control" placeholder="Supplier name" />
                                            {
                                                formErrors?.supplier_name?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.supplier_name}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Company Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={drugCategory.company_name} name="company_name" className="form-control" placeholder="Company name" />
                                            {
                                                formErrors?.company_name?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.company_name}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Contact Number :</label>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={drugCategory.contact_number} name="contact_number" className="form-control" placeholder="Contact Number" />
                                            {
                                                formErrors?.contact_number?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.contact_number}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Email :</label>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={drugCategory.email} name="email" className="form-control" placeholder="Email" />
                                            {
                                                formErrors?.email?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.email}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Address :</label>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={drugCategory.address} name="address" className="form-control" placeholder="Address" />
                                            {
                                                formErrors?.address?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.address}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">City :</label>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={drugCategory.city} name="city" className="form-control" placeholder="City" />
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

export default EditSupplier
