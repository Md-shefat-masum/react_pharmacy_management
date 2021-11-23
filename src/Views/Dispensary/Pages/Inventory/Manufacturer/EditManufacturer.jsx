import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UseAuth } from '../../../../../Hooks/UseAuth';
import { UseCommonData } from '../../../../../Hooks/UseCommonData'

function EditManufacturer() {
    const { calert } = UseCommonData();
    const { formErrors } = UseAuth();
    const params = useParams();
    const [drugCategory, setDrugCategory] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/inventory/manufacturer/get/${params.id}`)
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

        axios.post(`${process.env.REACT_APP_API_LINK}/inventory/manufacturer/update`, form_data)
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
                            <h4> Update Manufacturer</h4>
                        </div>
                        <div className="card-body">

                            <form action="" onSubmit={(e) => formHandler(e)}>
                                <div className="form-group">
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Manufacturer Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="name" defaultValue={drugCategory.name} className="form-control" placeholder="Storage name" />
                                            {
                                                formErrors?.name?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.name}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Manufacturer Description :</label>
                                        <div className="col-sm-9">
                                            <textarea type="text" defaultValue={drugCategory.description} name="description" className="form-control" placeholder="Storage Description" />
                                            {
                                                formErrors?.description?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.description}</span>
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

export default EditManufacturer
