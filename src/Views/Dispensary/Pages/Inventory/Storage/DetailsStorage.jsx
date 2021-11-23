import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UseAuth } from '../../../../../Hooks/UseAuth';
import { UseCommonData } from '../../../../../Hooks/UseCommonData'

function DetailsStorage() {
    const { calert } = UseCommonData();
    const { formErrors } = UseAuth();
    const params = useParams();
    const [drugCategory, setDrugCategory] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/inventory/storage/get/${params.id}`)
            .then(res => {
                setDrugCategory(res.data);
            })
        return () => {
            setDrugCategory({})
        }
    }, [])

    return (
        <div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-9">
                    <div className="card shadow-0 border-1 border">
                        <div className="card-header">
                            <h4>Storage details</h4>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th style={{ width: '30%' }}>Name</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.name}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Description</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.description}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Total Medicine</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.total_medicine}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Total Sale</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.total_sale}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Total Income</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.total_income}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Status</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>
                                            {
                                                drugCategory?.status === 1 ? <span className="badge bg-success">Active</span> : <span className="badge bg-warning">Deactive</span>
                                            }
                                        </td>
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

export default DetailsStorage
