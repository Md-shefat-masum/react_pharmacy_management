import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UseAuth } from '../../../../../Hooks/UseAuth';
import { UseCommonData } from '../../../../../Hooks/UseCommonData'

function DetailsCategory() {
    const { calert } = UseCommonData();
    const { formErrors } = UseAuth();
    const params = useParams();
    const [drugCategory, setDrugCategory] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/inventory/category/get/${params.id}`)
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

        axios.post(`${process.env.REACT_APP_API_LINK}/inventory/category/update`, form_data)
            .then(() => {
                // e.target.reset();
                calert(true, 'Category updated successfully.', 'light', 4000);
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
                            <h4>Category details</h4>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th style={{width:'30%'}}>Name</th>
                                        <th style={{width:3}}>:</th>
                                        <td>{drugCategory.name}</td>
                                    </tr>
                                    <tr>
                                        <th style={{width:'30%'}}>Description</th>
                                        <th style={{width:3}}>:</th>
                                        <td>{drugCategory.description}</td>
                                    </tr>
                                    <tr>
                                        <th style={{width:'30%'}}>Total Medicine</th>
                                        <th style={{width:3}}>:</th>
                                        <td>{drugCategory.total_medicine}</td>
                                    </tr>
                                    <tr>
                                        <th style={{width:'30%'}}>Total Sale</th>
                                        <th style={{width:3}}>:</th>
                                        <td>{drugCategory.total_sale}</td>
                                    </tr>
                                    <tr>
                                        <th style={{width:'30%'}}>Total Income</th>
                                        <th style={{width:3}}>:</th>
                                        <td>{drugCategory.total_income}</td>
                                    </tr>
                                    <tr>
                                        <th style={{width:'30%'}}>Status</th>
                                        <th style={{width:3}}>:</th>
                                        <td>{drugCategory.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DetailsCategory
