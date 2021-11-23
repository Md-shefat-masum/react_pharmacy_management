import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function DetailsDrugs() {
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

    return (
        <div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-9">
                    <div className="card shadow-0 border-1 border">
                        <div className="card-header">
                            <h4>Supplier details</h4>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th style={{ width: '30%' }}>Name</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.supplier_name}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Company</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.company_name}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Contact Number</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.contact_number}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Email</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.email}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Address</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.address}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>City</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drugCategory.city}</td>
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

export default DetailsDrugs
