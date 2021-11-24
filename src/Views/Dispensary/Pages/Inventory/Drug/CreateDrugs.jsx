import axios from 'axios';
import React, {useState} from 'react'
// import { useNavigate } from 'react-router-dom';
import { UseCommonData } from '../../../../../Hooks/UseCommonData'
import FormError from '../../../../Components/Shared/FormError';
import CategoryListModal from '../Components/CategoryListModal';

function CreateDrugs() {
    const { calert, control_modal,setModalContent } = UseCommonData();
    const [categoryIds, setCategoryIds] = useState({ids:[],details:[]});

    const formHandler = (e) => {
        e.preventDefault();
        let form_data = new FormData(e.target);
        axios.post(`${process.env.REACT_APP_API_LINK}/inventory/drug/create`, form_data)
            .then(() => {
                e.target.reset();
                calert(true, 'Supplier created successfully.', 'light', 4000);
            })
            .catch((error) => {
                let message = error?.response?.data?.err_message;
                calert(true, message || 'something is wrong try again..', 'warning', 4000);
            })
    }

    const modal_handler = (modal_content) => {
        const control_value = {
            trigger: true,
            header_text: 'Select Categories',
            size: 'xl',
        };
        setModalContent(modal_content);
        control_modal(control_value);
    }
    

    return (
        <div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-9">
                    <div className="card shadow-0 border-1 border">
                        <div className="card-header">
                            <h4> Create Drug</h4>
                        </div>
                        <div className="card-body">

                            <form action="" onSubmit={(e) => formHandler(e)}>
                                <div className="form-group">
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Drug Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="name" className="form-control" placeholder="Drug name" />
                                            <FormError field_name="name"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Categories :</label>
                                        <div className="col-sm-9">
                                            <input type="text" 
                                                onClick={()=>modal_handler(<CategoryListModal categoryIds={categoryIds} setCategoryIds={setCategoryIds} />)} 
                                                name="category_id" className="form-control" placeholder="Categories" />
                                            <FormError field_name="category_id"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Manufacurer :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="manufacturer_id" className="form-control" placeholder="Manufacurer" />
                                            <FormError field_name="manufacturer_id"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Storage Location :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="storage_location_id" className="form-control" placeholder="Storage Location" />
                                            <FormError field_name="storage_location_id"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Supplier :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="supplier_id" className="form-control" placeholder="Supplier" />
                                            <FormError field_name="supplier_id"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Need Prescription :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="need_prescription" className="form-control" placeholder="Need Prescription" />
                                            <FormError field_name="need_prescription"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Scientific Name :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="scientific_name" className="form-control" placeholder="Scientific Name" />
                                            <FormError field_name="scientific_name"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Storage Temperature :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="storage_temperature" className="form-control" placeholder="Storage Temperature" />
                                            <FormError field_name="storage_temperature"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Dangerous Level :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="dangerous_level" className="form-control" placeholder="Dangerous Level" />
                                            <FormError field_name="dangerous_level"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">No of limit in package :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="no_of_limit_in_package" className="form-control" placeholder="No of limit in package" />
                                            <FormError field_name="no_of_limit_in_package"></FormError>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="" className="col-sm-3 col-form-label">Unit Price :</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="unit_price" className="form-control" placeholder="Unit Price" />
                                            <FormError field_name="unit_price"></FormError>
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
