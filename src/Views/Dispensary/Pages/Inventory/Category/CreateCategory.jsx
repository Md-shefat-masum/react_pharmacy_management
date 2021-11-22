import axios from 'axios';
import React from 'react'
// import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../../../../Hooks/UseAuth';
import { UseCommonData } from '../../../../../Hooks/UseCommonData'

function CreateCategory() {
    const { calert } = UseCommonData();
    const { formErrors } = UseAuth();

    const formHandler = (e) => {
        e.preventDefault();
        let form_data = new FormData(e.target);
        axios.post(`${process.env.REACT_APP_API_LINK}/inventory/category/create`, form_data)
            .then(() => {
                e.target.reset();
                calert(true, 'Category created successfully.', 'light', 4000);
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
                            <h4> Create Category</h4>
                        </div>
                        <div className="card-body">

                            <form action="" onSubmit={(e) => formHandler(e)}>
                                <div className="form-group">
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Category Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="name" className="form-control" placeholder="Category name" />
                                            {
                                                formErrors?.name?.length > 0 &&
                                                <span className="text-danger mt-1">{formErrors.name}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Category Description :</label>
                                        <div className="col-sm-9">
                                            <textarea type="text" name="description" className="form-control" placeholder="Category Description" />
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

export default CreateCategory
