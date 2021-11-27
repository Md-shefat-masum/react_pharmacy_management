import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

function DetailsDrugs() {
    const params = useParams();
    const [drug, setDrug] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/inventory/drug/get/${params.id}`)
            .then(res => {
                setDrug(res.data);
            })
        return () => {
            setDrug({})
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
                                        <th style={{ width: '30%' }}>Photo</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>
                                            <img src={drug.full_photo_url} style={{ width: 150, }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Name</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drug.name}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Scientific Name</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drug.need_prescription}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Quantity</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drug.quantity}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Categories</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>
                                            {
                                                drug?.related_categories?.map(item => <span className="badge m-1 badge-primary " key={item.id}>{item.name}</span>)
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Manufacturer</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>
                                            {
                                                drug?.related_drug_manufacturer?.map(item => <span className="badge m-1 badge-primary " key={item.id}>{item.name}</span>)
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Storage</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>
                                            {
                                                drug?.related_drug_storage?.map(item => <span className="badge m-1 badge-primary " key={item.id}>{item.name}</span>)
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Supplier</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>
                                            {
                                                drug?.related_user_supplier?.map(item => <span className="badge m-1 badge-primary " key={item.id}>{item.name}</span>)
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Storage Temperature</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drug.storage_temperature} deg</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Dangerous Level</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drug.dangerous_level}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>No of unit in package</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>{drug.no_of_unit_in_package}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Unit price</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>$ {drug.unit_price}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Manufacture Date</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td> {drug.manufacture_date}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Expire Date</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td> {drug.expiry_date}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Quantity</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td> {drug.quantity}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Date Of Entry</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td> {drug.date_of_entry}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Indication</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td> {drug.indication}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Preparation</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td> {drug.preparation}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Dosage And Administration</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>
                                            <div style={{ width: '100%', overflowX: 'scroll' }}>
                                                {ReactHtmlParser(drug.dosage_and_administration)}
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th style={{ width: '30%' }}>Status</th>
                                        <th style={{ width: 3 }}>:</th>
                                        <td>
                                            {
                                                drug?.status === 1 ? <span className="badge bg-success">Active</span> : <span className="badge bg-warning">Deactive</span>
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
